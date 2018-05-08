import base from './base';

export default class cart extends base {

    /**
     * 获取已播放列表
     */
    static async getColumnList(pageNum) {
        const pageSize = 20;
        const url = `/userItem/list`;
        const payment = await this.get(url, { pageNum,pageSize });
        return payment;
    }

}


