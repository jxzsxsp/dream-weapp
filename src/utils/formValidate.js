class FormValidate {
  /**
   * 
   * 是否为空
   */
  isEmpty(s) {
    if (s == null || "" == s.trim() || s.replace(/\s+/g, "") == "") {
      return true;
    }
    return false;
  }

  /**
   * 
   * 实数是否合法
   */
  isRealNuber(s) {
    var reg = /^\d+\.?\d*$/;
    return reg.test(s);
  }

  /**
   * 
   * 数字校验
   */
  isNum(s) {
    var reg = /^[0-9]*$/;
    return reg.test(s);
  }

  /**
   * 
   * 固定电话 国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}
   */
  isFixedTelephone(s) {
    var reg = /^\d{3}-\d{8}(-\d{1,4})?$|^\d{4}-(\d{7}|\d{8})(-\d{1,4})?$/;
    return reg.test(s);
  }

  /**
   * 
   * 手机号验证
   */
  isMobilePhone(s) {
    var reg = /^1[3|4|5|6|7|8][0-9]\d{4,8}$/
    return reg.test(s);
  }

  /**
   * 
   * 验证手机号码
   */
  validateMobilePhone(s) {
    if (this.isEmpty(s)) {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        mask: true
      })   
      return false;
    }
    if (!this.isMobilePhone(s)) {
      wx.showToast({
        title: '手机号不正确！',
        icon: 'none',
        mask: true
      })
      return false;
    }
    return true;
  }

  /**
   * 
   * 固话和手机必填一
   */
  realTimeValidateCompanyPhone(s1, s2) {
    if (this.isEmpty(s1) && this.isEmpty(s2)) {
      wx.showToast({
        title: '固话和手机至少填一项',
        icon: 'none',
        mask: true
      })   
      return false;
    }
    if (!this.isEmpty(s1)) {
      if (!this.isFixedTelephone(s1)) {
        wx.showToast({
          title: '固定电话格式不正确！',
          icon: 'none',
          mask: true
        })   
        return false;
      }
    } else if (!this.isEmpty(s2)) {
      if (!this.isMobilePhone(s2)) {
        wx.showToast({
          title: '手机号码不正确！',
          icon: 'none',
          mask: true
        })  
        return false;
      }
    }
    return true;
  }

  /**
   * 
   * 邮箱格式是否合法
   */
  isEmail(s) {
    var emailLast = s.substring(s.lastIndexOf(".") + 1);
    var flag = "false";
    if (emailLast.length > 1) {
      var des = "'com'||'org'||'cn'||'net'";
      if (des.indexOf("'" + emailLast + "'") != -1) {
        flag = "true";
      }
    }
    if (flag != "true") {
      return false;
    }
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    return reg.test(s);
  }

  /**
   * 
   * 银行卡16-22位
   */
  isbankNo(s) {
    var reg = /^\d{9,22}$/;
    return reg.test(s);
  }
  /**
   * 
   * 姓名验证   1.1姓名无字母、无数字，名字可含“·” 
   */
  isLetterOrNubmer(s) {
    var reg = /[A-Za-z0-9]+/;
    return reg.test(s);
  }

  /**
   * 
   * 是否包含半角
   */
  isBanJiaoChar(s) {
    var reg = /[\u0000-\u00ff]/;
    return reg.test(s);
  }

  /**
   * 
   * 验证长度(s长度小于等于len)
   */
  isNotLengthRule(s, len) {
    if (this.isEmpty(s) || s.length > len) {
      return true;
    }
    return false;
  }

  /**
   * 
   * 验证身份证   
   */
  isIdCardNo(num) {
    if (!(/(^\d{17}([0-9]|X)$)/.test(num))) {
      //alert('身份证号长度不正确或不符合规定！');             
      return false;
    }
  }

  /**
   * 
   * 车牌验证  1位汉字＋1位大写字母＋5位大写字母数字混合
   */
  isCarNo(s) {
    var reg = /^[京津渝沪冀晋辽吉黑苏浙皖闽赣鲁豫鄂湘粤琼川贵云陕甘青台蒙桂宁新藏澳][A-HJ-NP-Z]{1}([DF]{1}[A-HJ-NP-Z0-9]{5}|[A-HJ-NP-Z0-9]{5})$/;
    return reg.test(s);
  }

  /**
   * 
   * 判断银行卡号
   */
  isBankCardId(s) {
    var reg = /^\d{16}$|^\d{19}$/;
    if (reg.test(s)) {
      return this.ruleBank(s);
    } else {
      return false;
    }

  }
  /**
   * 
   * 输入的银行卡最后一位是否与算出来是否一致
   */
  ruleBank(s) {
    var last = s[s.length - 1];
    var bit = this.lastBit(s.substring(0, s.length - 1));
    return bit == last;
  }

  /**
   * 
   * 返回校验位 通过银行卡校验规则（Luhn算法）银行卡的最后一位
   */
  lastBit(s) {
    var luhuSum = 0;
    for (var i = s.length - 1, j = 0; i >= 0; i-- , j++) {
      var k = s[i] - '0';
      if (j % 2 == 0) {
        k *= 2;
        k = parseInt(k / 10) + k % 10;
      }
      luhuSum += k;
    }
    return (luhuSum % 10 == 0) ? '0' : (10 - luhuSum % 10);
  }

  /**
   * 
   * 根据身份证号获取用户的
   */
  IdCard(userCard, num) {
    if (num == 1) {
      //获取出生年月日
      var birth = userCard.substring(6, 10) + "-" + userCard.substring(10, 12) + "-" + userCard.substring(12, 14);
      return birth;
    }
    if (num == 2) {
      //获取性别
      if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
        return "男";
      } else {
        return "女";
      }
    }
    if (num == 3) {
      //获取年龄
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDay();
      var age = myDate.getFullYear() - userCard.substring(6, 10) - 1;
      if (userCard.substring(10, 12) < month || userCard.substring(10, 12) == month && userCard.substring(12, 14) <= day) {
        age++;
      }
      return age;
    }
  }

  /**
   * 
   * 信用卡校验
   */
  isCreditDate(data) {
    var reg = /^(0[1-9]|1[0-2])(\/)([1-9]\d)$/;
    return reg.test(data);
  }

  /**
    * 
    * 信用代码校验
    */
  checkCreditNub(code) {
    var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
    var ws = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
    var codes = new Array();
    codes[0] = code.substr(0, code.length - 1);
    codes[1] = code.substr(code.length - 1, code.length);
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += str.indexOf(codes[0].charAt(i)) * ws[i];
    }
    var temp = sum % 31;
    temp = temp == 0 ? 31 : temp;
    return codes[1] == str[31 - temp];
  }

  /**
  *
  *校验营业执照号码
  **/
  checkBusnLicNub(str) {
    var validateCode = str.substr(str.length - 1, str.length);
    var result = -1;
    if (null != str && str.length > 1) {
      var ti = 0;
      var si = 0; // pi|11+ti
      var cj = 0; // （si||10==0？10：si||10）*2
      var pj = 10; // pj=cj|11==0?10:cj|11
      for (var i = 0; i < str.length; i++) {
        ti = str[i];
        si = pj + ti;
        cj = (0 == si % 10 ? 10 : si % 10) * 2;
        pj = (cj % 11) == 0 ? 10 : (cj % 11);
        if (i == str.length - 1) {
          if (str.length == 14) {
            pj = (cj % 11) == 0 ? 10 : (cj % 11);
            result = 1 - pj < 0 ? 11 - pj : 1 - pj;// 返回营业执照注册号的校验码
          } else if (str.length == 15) {
            result = si % 10; // 返回1 表示是一个有效营业执照号
          }
        }
      }
    }
    return validateCode == result;
  }
}

export default FormValidate