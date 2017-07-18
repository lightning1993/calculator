//计算功能实现
var list = document.getElementById("list");
//计算显示屏
var sum = document.getElementById("sum");
//数字显示屏
var content = document.getElementById("content");
//获取数字
var nums = document.getElementsByClassName("num");
//获取计算符号
var signs = document.getElementsByClassName("sign");
var lis = list.children;
var calc = document.getElementById("calc");
//公式
var formula = "";
var str = "";
//记录上一次触发的事件是否是等号运算
var equal = false;
//数字部分显示
for (var i = 0, len = nums.length; i < len; i++) {
    nums[i].onclick = function(e) {
        if (equal) {
            formula = "";
        }
        //解决数字开头多个0问题
        if (e.target.innerHTML === "0") {
            if (str !== "0") {
                str += e.target.innerHTML;
                formula += e.target.innerHTML;
            }
        } else if (e.target.innerHTML === ".") {
            if (str === "") {
                str = "0" + e.target.innerHTML;
                formula += str;
            }
            if (str.indexOf(".") == -1) {
                str += e.target.innerHTML;
                formula += e.target.innerHTML;
            }
        } else if (str === "0") {
            str = e.target.innerHTML;
            formula = formula.slice(0, formula.length - 1) + e.target.innerHTML;
        } else {
            str += e.target.innerHTML;
            formula += e.target.innerHTML;
        }
        content.setAttribute("value", str);
        sum.setAttribute("value", formula);
        equal = false;
    };
}

//运算符部分
for (var i = 0, len = signs.length; i < len; i++) {
    signs[i].onclick = function(e) {
        //直接输入运算符时公式前面加0
        if (formula === "") {
            formula = "0" + e.target.innerHTML;
        }
        var c = formula.charAt(formula.length - 1);
        //最后一位是运算符需要替换
        if (c === "+" || c === "-" || c === "/" || c === "%") {
            formula = formula.substring(0, formula.length - 1);
            formula += e.target.innerHTML;
            sum.setAttribute("value", formula);
        } else if (c === ".") {
            return false;
        } else {
            //计算结果
            content.setAttribute("value", eval(formula));
            formula += e.target.innerHTML;
            sum.setAttribute("value", formula);
            str = "";
        }
        equal = false;
    };
}

//AC一键清除
lis[0].onclick = function() {
        str = "";
        formula = "";
        content.setAttribute("value", str);
        sum.setAttribute("value", formula);
        equal = false;
    }
    //DEL逐个删除
lis[1].onclick = function() {
        if (equal) {
            str = "";
        } else {
            str = str.slice(0, str.length - 1);
            formula = formula.slice(0, formula.length - 1);
        }
        content.setAttribute("value", str);
        sum.setAttribute("value", formula);
        equal = false;
    }
    //等号运算
list.lastElementChild.onclick = function() {
    //直接输入运算符时不变
    if (equal || formula === "") {
        return;
    }
    var c = formula.charAt(formula.length - 1);
    if (c === "+" || c === "-" || c === "/" || c === "%") {
        return;
    }
    sum.setAttribute("value", formula);
    formula = String(eval(formula));
    var result = "",
        len = formula.length;
    if (formula.indexOf(".") == -1) {
        if (len < 15) {
            result = formula;
        } else {
            result = formula.charAt(0) + "." + formula.slice(1, 11) + "e" + (formula.length - 1);
        }
    } else if (formula.indexOf(".") < 11) {
        if (formula.length < 15) { result = formula; } else { result = formula.slice(0, 15); }
    } else {
        result = formula.charAt(0) + "." + formula.slice(1, 11) + "e" + (formula.indexOf(".") - 1);
    }
    content.setAttribute("value", result);
    str = "";
    equal = true;
};
