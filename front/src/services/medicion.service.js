import http from "../api";

class MedicionDataService {
    async getAllMed(){
        return await http.get('/medicion');  
    }

    async get(id){
        return http.get(`/medicion/${id}`);
    }

    async getAllSen(){
        return await http.get('/sensores');
    }

    async updateSen(id){
        return await http.put(`/sensores/${id}`);
    }

    async senMed(){
        return await http.get(`/sensores/senmed/`);
    }

}

export default new MedicionDataService();
