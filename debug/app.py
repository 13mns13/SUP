from flask import Flask, request,session
import database, json,flask_cors,java,datetime, os

dataBase = database.Data()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'cb02820a3e94d72c9f950ee10ef7e3f7a35b3f5b'
flask_cors.CORS(app)#,resources={r"/api/*": {"origins": "*"}})
app.permanent_session_lifetime = datetime.timedelta(hours=1)
peer_id = {}

def __check__(cors):
    sites =["https://myitschool.ru","https://e.not-undo.xyz","http://localhost:3000"]
    checked = False
    if "HTTP_ORIGIN" in cors:
        cors = cors["HTTP_ORIGIN"]
    elif "HTTP_REFERER" in cors:
        cors = cors["HTTP_REFERER"]
    else:
        return False
    for i in sites:
        if i in  cors:
            checked= True
    return checked

@app.route("/api/session/",methods=["POST"])
def __session__():
    data = json.loads(request.data)
    if not __check__(request.headers.environ):
        return {
            "error":"403 :("
        },403
    ip = request.headers.environ["HTTP_X_REAL_IP"]
    session["token"] = os.urandom(1000).hex()
    peer_id[ip]={}
    for i in session:
        peer_id[ip][i] = session[i]
    
    return dataBase.__session__(data,ip,session["token"])

@app.route("/api/java/",methods=["POST"])
def __java__():
    data = json.loads(request.data)
    return java.data(data["code"], data["input"]) if "code" in data and "input" in data else {"error":-1,"message":"Invalid code"}

@app.route("/api/auth/",methods=["POST", "GET"])
def __auth__():
    global session
    if not __check__(request.headers.environ):
        return {
            "error":"CORS :("
        },-100

    ip = request.headers.environ["HTTP_X_REAL_IP"]
    if ip in peer_id:
        for i in peer_id[ip]:
            session[i] = peer_id[ip][i]
        peer_id.pop(ip)
    ref = session.get("ref")
    if "ref" in session:
        session.pop("ref")
    return dataBase.__auth__(ip,session.get("token"),ref)


@app.route("/api/user/<id>/",methods=["POST", "GET"])
def __user__(id):
    global session
    """if not __check__(request.headers.environ):
        return {
            "error":"CORS :("
        },-100
    """
    ip = request.headers.environ["HTTP_X_REAL_IP"]
    return dataBase.__user__(id,ip,session.get("token"))

@app.route("/api/exit/",methods=["POST", "GET"])
def __exit__():
    global session
    return dataBase.__exit__(session.get("token"))

@app.route("/api/ref/<id>/",methods=["GET"])
def __ref__(id):
    global session
    if "ref" not in session:
        session["ref"] = id
        return {
            "success":True
        }
    return {
        "success":False
    }

@app.route("/api/markets/",methods=["GET","POST"])
def __markets__():
    return dataBase.__market__()
 
@app.route("/api/js/",methods=["GET"])
def __get_js__():
    with open("index.js","r", encoding="utf-8") as f:
        return f.read()

@app.errorhandler(404)
def error(e):
    return {
        "error":"404 :("
    }, 404
if __name__=="__main__":
    app.run(port=8090)