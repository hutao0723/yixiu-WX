import base from './base';

export default class sales extends base {
    
    static async info() {
        const url = `/capital/account/info`;
        let params = {};
        const res = await this.get(url, { params });
        return res.body.data;
    }

    static async incomeDetail(id,pageSize) {
        const url = `/capitalAccountDetail/getIncomeFlow`;
        let params = {
            id,
            pageSize
        };
        const res = await this.get(url, { params });
        return res.body.data;
    }

    static async widthdraw(withdrawAmount) {
        const url = `/capital/account/withdraw`;
        // let deal = (withdrawAmount) => {
        //     return `${withdrawAmount}00`;
        // }
        const res = await this.post(url, { withdrawAmount: withdrawAmount }, { emulateJSON: true });
        return res.body;
    }

    static async record(lastCreateDate) {
        const url = `/capital/account/withdraw/record`;
        let params = {
            lastCreateDate
        }
        // console.log(params)
        const res = await this.get(url, { params });
        return res.body.data;
    }

    //distribution/getBindUsers
    static async getBindUsers(pageNum, pageSize, bindStatus) {
        const url = `/distribution/getBindUsers`;
        let params = {
            pageNum,
            pageSize,
            bindStatus
        }
        // console.log(params)
        const res = await this.get(url, { params });
        return res.body.data;
    }

    static async redPoint(functionsTypes) {
        const url = `/userRedPoint/list`;
        let params = {
            functionsTypes
        }
        const res = await this.get(url, { params });
        return res.body.data;
    }


    static async qrcode() {
        const url = `/poster/QRCode`;
        let params = {
            
        }
        const res = await this.get(url, { params });
        return res.body;
    }

    //poster/readPlanPosters
    static async readPlanPosters() {
        const url = `/poster/readPlanPosters`;
        let params = {

        }
        const res = await this.get(url, { params });
        return res.body.data;
    }

    // /poster/QRCodeUrl
    static async qrcodeUrl() {
        const url = `/poster/QRCodeUrl`;
        let params = {

        }
        const res = await this.get(url, { params });
        return res.body.data;
    }

    // /user/getUserInfo
    static async getUserInfo() {
        const url = `/user/getUserInfo`;
        let params = {

        }
        const res = await this.get(url, { params });
        return res.body.data;
    }
}
