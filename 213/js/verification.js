var $$ = require('Utils2');

var errorTipFn = require('../errorTip');

function errorTip(id, text) {
    errorTipFn(id, text, 'afterend');
}

function verification(Req) {

    if(Req.mobile && !$$.isMobile(Req.mobile)) {
        errorTip('mobile', '手机号码格式错误！');
        return false;
    }

    if(Req.vin && Req.vin.length != 6 && Req.vin.length != 17) {
        errorTip('vin', '格式错误！必须是6位或17位！');
        return false;
    }

    if(Req.licenseNo && !$$.isCarLicense(Req.licenseNo)) {
        errorTip('licenseNo', '格式错误！范例：沪A88888');
        return false;
    }

    if(Req.insuredName && (Req.insuredName.length < 2 || Req.insuredName.length > 100)) {
        errorTip('insuredName', '长度需在2-100字符之间！');
        return false;
    }

    return true;
}

module.exports = verification;
