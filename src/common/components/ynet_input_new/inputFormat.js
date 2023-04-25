export const inputFormat = {
    methods: {
        _formatMoney (money, type = 2) {
            let value = money;
            let isUp = false; //是否进一
            let decimalsNum = Math.pow(10, type);
            if (value === '.') return '0.00';
            value = (value * 1).toString();// 处理数据首位为零
            if (value.indexOf('.') == 0) {
                value = '0' + value;
            }
            // value = value.indexOf('.') > 0 ? value.replace(/\.\d*/g, (xiaoshu) => {
            //     return (xiaoshu.length === 2 ?
            //         xiaoshu + '0' : xiaoshu.length === 1 ?
            //             xiaoshu + '00' : xiaoshu.charAt(3) > 4 ?
            //                 (Math.round(xiaoshu * decimalsNum) / decimalsNum).toString().slice(1) :
            //                 xiaoshu.slice(0, 3))
            // }) : value + '.00';
            value = value.indexOf('.') > 0 ? value.replace(/\.\d*/g, (xiaoshu) => {
                if (xiaoshu.length === 2) {
                    return xiaoshu + '0';
                } else {
                    if (xiaoshu.length === 1) {
                        return xiaoshu + '00';
                    } else {
                        if (xiaoshu.charAt(3) > 4) {
                            let temp = (Math.round(xiaoshu * decimalsNum) / decimalsNum).toString().slice(1);
                            // client.debug(tem);
                            // 当temp为空的时候就是边际情况.999999的时候要进一
                            if (!temp) {
                                isUp = true;
                            }
                            // 当为5.89999 =》 5.90 补一位0
                            if (temp.length < 3 && temp.length > 1) {
                                temp = temp + '0';
                            }
                            return temp;
                        } else {
                            return xiaoshu.slice(0, 3);
                        }
                    }
                }
            }) : value + '.00';
            // 进一操作
            if (isUp) {
                value = (value - 0 + 1) + '.00';
            }
            value = value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            return value;
        },
        _formatPhone (phoneNum, noSpacing) {
            // alert(phoneNum)
            if (noSpacing) return phoneNum;
            let mobilePhoneReg = /^1/;
            let telephoneReg = /^0/;
            let _phoneNum = phoneNum.replace(/\s|-/g, '');
            return mobilePhoneReg.test(_phoneNum) ? _phoneNum.replace(/(^\d{3}|\d{4}\B)/g, '$1 ') : _phoneNum.replace(/(^0\d{3}|010|021|022|023)/, '$1-');
            // 另一个：.replace(/\B(?=(?:\d{4})+$)/g, '-')
            // return !phoneReg.test(phoneNum) ? false : phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
        },
        _formatBankCard (card, noSpacing) {
            if (noSpacing) return card;
            let _card = card.replace(/\s/g, '');
            return _card.replace(/(^\d{4}|\d{4}\B)/g, '$1 ');
        },
        //解决direction：rtl的时候输入变成反方向的问题
        _formatBankCardReg (card) {
            // let _card = card.replace(/\s/g, '');
            let op = [];
            let _card = card.replace(/\s/g, '').replace(/(^\d{4}|\d{4}\B)/g, '$1 ');
            let rs = _card.split(' ');
            rs.forEach((element) => {
                op.push(element + '&nbsp');
            });
            console.log(op.join(''));
            return op.join('');
        },
        limitBankCard (e) {
            console.log(e);
        },
        limitMMYY (val, noSpacing) {
            if (noSpacing) return val;
            let _val = val.replace(/\//g, '');
            return _val.replace(/(^\d{2})/g, '$1/');
        }
        // _formateDate ()
    }
};
