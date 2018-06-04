import base from './base';

export default class sales extends base {
    /**
     *  获取资金账户信息
     */
    static async info() {
        const url = `/capital/account/info`;
        let params = {};
        const res = await this.get(url, { params });
        return res.body.data;
    }
    /**
     * 分页查询获取资金账户收益流水
     * @param {*} pageNum 页码，默认页码为1
     * @param {*} pageSize 分页大小，默认分页大小为20
     */
    static async incomeDetail(pageNum,pageSize) {
        const url = `/capitalAccountDetail/getIncomeFlow`;
        let params = {
            pageNum,
            pageSize
        };
        const res = await this.get(url, { params });
        return res.body.data;
    }
    /**
     * 提现
     * @param {*} withdrawAmount 提现金额（分）
     */
    static async widthdraw(withdrawAmount) {
        const url = `/capital/account/withdraw`;
        // let deal = (withdrawAmount) => {
        //     return `${withdrawAmount}00`;
        // }
        const res = await this.post(url, { withdrawAmount: withdrawAmount }, { emulateJSON: true });
        return res.body;
    }
    /**
     * 提现记录
     * @param {*} pageNum  当前页码
     * @param {*} pageSize 每页条数
     */
    static async record(pageNum, pageSize) {
        const url = `/capital/account/withdraw/record`;
        let params = {
            pageNum,
            pageSize
        }
        const res = await this.get(url, { params });
        return res.body.data;
    }

    

    /**
     * 查询我的客户
     * @param {*} pageNum   页码，默认页码为1
     * @param {*} pageSize  分页大小，默认分页大小为20
     * @param {*} bindStatus 绑定状态 1-绑定中 0-已解绑
     */
    static async getBindUsers(pageNum, pageSize, bindStatus) {
        const url = `/distribution/getBindUsers`;
        let params = {
            pageNum,
            pageSize,
            bindStatus
        }
        const res = await this.get(url, { params });
        return res.body.data;
    }

    /**
     * 获取用户红点信息
     * @param {*} functionsTypes 用户红点功能类型集合：1:我的客户;2:收益记录，例：1,2
     */
    static async redPoint(functionsTypes) {
        const url = `/userRedPoint/list`;
        let params = {
            functionsTypes
        }
        const res = await this.get(url, { params });
        return res.body.data;
    }

    /**
     * 获取图片流二维码
     */
    static async qrcode() {
        const url = `/poster/QRCode`;
        let params = {
            
        }
        const res = await this.get(url, { params });
        return res.body;
    }

    /**
     *  获取阅读计划海报列表
     */
    static async readPlanPosters() {
        const url = `/poster/readPlanPosters`;
        let params = {

        }
        const res = await this.get(url, { params });
        return res.body.data;
    }

    /**
     *  获取二维码URL
     */
    static async qrcodeUrl() {
        const url = `/poster/QRCodeUrl`;
        let params = {

        }
        const res = await this.get(url, { params });
        return res.body.data;
    }

    /**
     *  获取用户的微信昵称、头像，id
     */
    static async getUserInfo() {
        const url = `/user/getUserInfo`;
        let params = {

        }
        const res = await this.get(url, { params });
        return res.body.data;
    }
}
