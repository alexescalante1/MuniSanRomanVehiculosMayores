import { FragmentData } from "../../Main/Utilities/FragmentStorage/FragmentData";

export function GetToken(){
    var tkn: string = "";
    const tokenLocalStorage = new FragmentData("MyKingAlex").GtParttnDtLS(
      "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
      "Tulg"
    );

    if (tokenLocalStorage) {
      tkn = JSON.parse(tokenLocalStorage)?.Tk;
    }

    const headers = {
      Authorization: "Bearer " + tkn,
    };
    return headers
}
export function GetUrlDni(dni:string){
  const cUrlDni = "https://dniruc.apisperu.com/api/v1/dni/"+dni+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvaG5hbGFtdXNAZ21haWwuY29tIn0.afUd28wIqmAoFV9CbIu9JZcIRynhCi1t1P--Sru3kRY";
  return cUrlDni;
}
export function GetUrlRuc(ruc:string){
  const cUrlRuc = "https://dniruc.apisperu.com/api/v1/ruc/"+ruc+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvaG5hbGFtdXNAZ21haWwuY29tIn0.afUd28wIqmAoFV9CbIu9JZcIRynhCi1t1P--Sru3kRY";
  return cUrlRuc;
}