export default {
    /**
  * 金额的千分位符，以及整数自动补两位零
  * @param {String} num  金额
  * @param {Boolean} needThousander 是否需要千分位符
  * @returns {string|*}
  */
    formatMoney(num, needThousander = true) {
        num = num.toString();
        if (!num) return
        if (num.indexOf(".") != -1) {
            let newVal = num.split(".");
            if (newVal[1].length == 1) {
                newVal = newVal.join(".");
                newVal += "0";
                num = newVal;
            }
        } else {
            num += ".00";
        }
        if (needThousander) {
            num = num.toString().replace(/\d+/, function (n) {
                return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                    return $1 + ",";
                });
            })
        }
        return num || "";
    }
}