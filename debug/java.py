import requests

url ="https://api2.sololearn.com/v2/codeplayground/v2/compile"

def data(code,inpit_):
    code = code.replace("\n","")
    data={
            "code":f"""{code}""",
            "codeId": None,
            "input": inpit_,
            "language": "java"
    }
    res = requests.post(url,json=data).json()
    return res["data"] if "data" in res else {
        "error":'java'
    }
