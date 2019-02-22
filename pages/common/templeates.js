require("../../utils/config.js"), getApp();

Page({
    data: {},
    viewTap: function() {
        this.setData({
            text: "Set some data for updating view."
        });
    },
    customData: {
        hi: "MINA"
    }
});