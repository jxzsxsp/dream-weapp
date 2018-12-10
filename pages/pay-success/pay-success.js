import { $Page, $wx } from '../../genji4mp/index';

const props = {
}

const data = {
  fee: "0.00"
}

const lifecycle = {
  onLoad: function (query) {
    let fee = query.fee;
    let orderNo = query.orderNo;
    this.setData({ fee: fee, orderNo: orderNo });
  },
}

const viewAction = {
}

const privateMethod = {
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)