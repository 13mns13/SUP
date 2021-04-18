
import threading
import pymongo
import  datetime, requests, time
from bs4 import BeautifulSoup
import datetime as DT
from bson import ObjectId
from requests.sessions import session
class Data:
    def __init__(self) -> None:
        client = pymongo.MongoClient('localhost', 27017)
        db = client['data']
        self.data_users =db['data_users']
        self.data_task = db["data_task"]
        self.data_market = db["data_market"]
        self.lvl ={
        }
        old = 100
        kd = 0
        for i in range(1,100):
            self.lvl[str(i)] = old
            old+=150+kd
            kd+=5
        #self.data_users.remove({})
        #self.data_task.remove({})
        a = []
        for i in self.data_users.find({}):
            a.append(i)
        self.kf = 10
        t = threading.Thread(target=self.__update_parse__)
        t.start( )

    def __update_parse__(self):
        while True:
            thr = []
            users = self.data_users.find({})
            for i in users:
                session = requests.session()
                for j in i["session"].split("; "):
                    key = j.split("=")
                    session.cookies[key[0]] = key[1]
                t = threading.Thread(target=self.__parse_module__, args=(i["_id"],session,))
                t.start()
                thr.append(t)
            for i in thr:
                i.join()
            time.sleep(60*15)
        
    def __parse_module__(self,id,session):
        response = session.get("https://myitschool.ru/edu/course/view.php?id=6")
        soup = BeautifulSoup(response.text,"lxml")
        ul = soup.find("ul",{"class":"topics"})
        if not ul:return
        lis = ul.find_all("h3",{"class":"section-title"})
        
        threads = []
        user_response = {}
        def __parse_task__(session,url,key1,key2):
            response = session.get(url)
            soup = BeautifulSoup(response.text,"lxml")
            data = soup.find("div",{"id":"feedback"})
            if not data: return
            table = data.parent.find("table").find_all("tr")
            datas = []
            for i in range(len(table)):
                if i ==0:
                    continue
                v = table[i]
                if "Завершенные" not in v.text:
                    continue
                tds = v.find_all("td")
                q = tds[1].text
                q= q[q.find(",")+2:]
                dt = int(DT.datetime.strptime(q, '%d %B %Y, %H:%M').timestamp())
                datas.append({
                    "attempt":int(tds[0].text),
                    "datetime":dt,
                    "value":float(tds[3].text.replace(",",".")),
                    "ball":float(tds[2].text.replace(",",".")),

                })

       
            if len(datas) ==0:
                return
            data = data.text
            data = float(data[data.find(":")+1:data.find("/")].replace(" ","").replace(",",""))/100
            user_response[key1][key2] = {
                "max":data,
                "data":datas,
                "url":url
            }

        def parse_module(url,key):
            threadsq =[]
            response = session.get(url)
            soup = BeautifulSoup(response.text,"lxml")
            ul = soup.find_all("ul",{"class":"section img-text"})
            data = []
            for i in ul:
                q = i.find_all("a")
                for j in q:
                    if "https://myitschool.ru/edu/mod/quiz/view.php" in j.attrs["href"]:
                        data.append({
                            "t":j.text.replace(" Тест",""),
                            "h":j.attrs["href"]
                        })
              
            for j in data:
                user_response[key][j["t"]]=None
                a = j["h"]
                t = threading.Thread(target=__parse_task__,args=(session,a,key,j["t"],))
                t.start()
                threadsq.append(t)
            for i in threadsq:
                i.join()

        for i in lis:
            a = i.find("a").attrs["href"]
            user_response[i.text]={}
            t = threading.Thread(target=parse_module,args=(a,i.text,))
            t.start()
            threads.append(t)
        for i in threads:
            i.join()
        qw = self.data_task.find({"user_id":id})
        q =0
        for i in qw:
            q +=len(i["value"]["data"])
        self.data_task.remove({"user_id":id})
        k = 0
        count_all = 0
        count_ = 0
        for i in user_response:
            for j in user_response[i]:
                count_all+=1
                v = user_response[i][j]
                if not v: continue
                count_+=1
        for i in user_response:
            qw= 0
            for j in user_response[i]:
                v = user_response[i][j]
                if not v: continue
                qw+=1
            for j in user_response[i]:
                v = user_response[i][j]
                if not v: continue
                k+=len(v["data"])
                module_percent = round(count_/count_all,2)
                self.data_task.insert({
                    "user_id":id,
                    "module":i,
                    "module_percent":module_percent,
                    "test":j,
                    "value":v,
                    "percent": round(qw/len(user_response[i]),2)
                })
        user = self.data_users.find_one({"_id":id})
        user["balance"]+=self.kf * (k-q)
        user["xp"]+=self.kf *(k-q)
        xp = self.lvl[str(user["lvl"])]
        while user["xp"]>=xp:
            xp = self.lvl[str(user["lvl"])]
            if user["xp"]>=xp:
                user["xp"] -= xp
                user["lvl"]+=1
        self.data_users.update({"_id":id},user)

    def __session__(self, data, ip_address,ip_auth):
        if "session" not in data:
            return {
                "error":"403 :("
            },403
        
        session_user = data["session"]
        session = requests.session()
        for i in session_user.split("; "):
            key = i.split("=")
            session.cookies[key[0]] = key[1]
        user ={}
        thread =[]

        def get_id():
            response = session.get("https://myitschool.ru/edu/")
            soup = BeautifulSoup (response.text, 'lxml')
            action = soup.find("div",{"id":"action-menu-0-menu"})
            profile = action.find_all("a",{"class":"dropdown-item menu-action"})
            href = profile[1].attrs["href"]
            user["id_moodle"] =int(href[href.find("?id=")+4:])

        def get_profile():
            response = session.get("https://myitschool.ru/edu/user/profile.php")
            soup = BeautifulSoup (response.text, 'lxml')
            name = soup.find("div",{"class":"page-header-headings"})
            if not name: return
            name = name.text.split()
            user["first_name"] =name[0]
            user["last_name"] =name[1]
            user["email"] =soup.find("li",{"class":"contentnode"}).find("a").text
            user["avatar"] = soup.find("img",{"class":"userpicture defaultuserpic"}).attrs["src"]
         

        t = threading.Thread(target=get_id)
        t.start()
        thread.append(t)
        t = threading.Thread(target=get_profile)
        t.start()
        thread.append(t)
        for i in thread:
            i.join()
        user["ip"] = ip_address
        user["ip_auth"] = ip_auth
        user["session"] =data["session"]

        res = self.data_users.find_one({"id_moodle":user["id_moodle"]})
        ress = self.data_users.find({"ip":ip_address,"ip_auth":ip_auth})
        for i in ress:
            i["ip"] =None
            self.data_users.update({"_id":i["_id"]},i)
        if res:
            for i in user:
                res[i] = user[i]
            self.data_users.update({"id_moodle":user["id_moodle"]},res)
        else:
            user["lvl"] =1
            user["balance"] =10
            user["xp"] =0
            user["ref"] =None
            user["datetime"] = int(datetime.datetime.now().timestamp())
            self.data_users.insert(user)
        
        
        _id = self.data_users.find_one({"id_moodle":user["id_moodle"]})["_id"]
        t = threading.Thread(target=self.__parse_module__, args=(_id,session))
        #t.start()
        return {
            "success":True
        }

    def __auth__(self,ip_address,ip_auth,ref):
        user = self.data_users.find_one({"ip":ip_address,"ip_auth":ip_auth})
        if not user:
            return {
                "error":"403 :("
            }, 403
        response = {}
        id  = user["_id"]
        for i in user:
            if i in ["ip","session","ip_auth"]:
                continue
            if "_id" ==i:
                user[i] = str(user[i])
            response[i] = user[i]
        ress = self.data_task.find({"user_id":id})
        res =[]
        for i in ress:
            res.append(i)
        response["progress"] = []
        testing = {}
        for i in res:
            if i["module"] not in testing:
                testing[i["module"]] =[]
            i["_id"]  = str(i["_id"])
            i.pop("user_id")
            key = i["module"]
            if "module" in i:
                i.pop("module")
            testing[key].append(i)
        response["progress"]=[]
        qqq =0
        for i in testing:
            qq = testing[i][0]["percent"]*100
            qqq = testing[i][0]["module_percent"]*100
            for j in range(len(testing[i])):
                testing[i][j].pop("percent")
                testing[i][j].pop("module_percent")

            response["progress"].append({
                "module":i,
                "data":testing[i],
                "percent":qq
            })
        _id = ObjectId( user['_id'])
        response["module_percent"] = qqq
        if ref and (datetime.datetime.now().timestamp()- user["datetime"])<=60 and not user['ref'] and ref!=str(_id) :
            user['ref'] = ref
            user['_id'] = _id
            self.data_users.update({"ip":ip_address,"ip_auth":ip_auth},user)
            res = self.data_users.find_one({"_id":_id})
            if res:
                res["balance"] +=50
                self.data_users.update({"_id":_id},res)
        response["xp_max"] = self.lvl[str(response["lvl"])]
        return response

    def __exit__(self,ip_address):
        user = self.data_users.find_one({"ip":ip_address})
        if not user:
            return {
                "error":"403 :("
            }, 403
        user["ip"] = None
        self.data_users.update({"ip":ip_address},user)
        return {
            "success":True
        }

    def __user__(self, id, ip_address,ip_auth):
        user = self.data_users.find_one({"ip":ip_address,"ip_auth":ip_auth})
        if user:
            if ObjectId(id) == user["_id"]:
                return self.__auth__(ip_address,ip_auth,None)
        try:
            id = ObjectId(id)
        except:
            return {
                "error":"502 :("
            },502
        user = self.data_users.find_one({"_id":id})
        if not user:
            return {
                "error":"404 :("
            }
        response = {}
        for i in user:
            if i in ["ip","session","ip_auth"]:
                continue
            if "_id" ==i:
                user[i] = str(user[i])
            response[i] = user[i]
        ress = self.data_task.find({"user_id":id})
        res =[]
        for i in ress:
            res.append(i)
        response["progress"] = []
        testing = {}
        for i in res:
            if i["module"] not in testing:
                testing[i["module"]] =[]
            i["_id"]  = str(i["_id"])
            i.pop("user_id")
            key = i["module"]
            if "module" in i:
                i.pop("module")
            testing[key].append(i)
        response["progress"]=[]
        qqq =0
        for i in testing:
            qq = testing[i][0]["percent"]*100
            qqq = testing[i][0]["module_percent"]*100
            for j in range(len(testing[i])):
                testing[i][j].pop("percent")
                testing[i][j].pop("module_percent")

            response["progress"].append({
                "module":i,
                "data":testing[i],
                "percent":qq
            })
        response["module_percent"] = qqq    
        response["xp_max"] = self.lvl[str(response["lvl"])]
        return response

    def __market__(self):
        res = self.data_market.find({})
        response = []
        for i in res:
            i["_id"] = str(i)
            response.append(i)
        return {
            "data":response
        }


