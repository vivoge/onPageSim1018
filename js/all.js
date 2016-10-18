$(function () {

    //模拟的返回的对象格式数据，造数据用的js/createJson.js，JSON串在fodder.json

    var fodderDataResult = {
        Status: 1,
        Message: 'Data error',
        userId: "",                               //存储作者ID的外键
        totalPage: 5,                            //修改“总页数”分页项目会按照此值动态创建1,2,3...
        pageNum: 1,                              //修改当前页码只会影响到分页href提交的数值，以及“上一页”，“下一页”，“跳转”按钮的ajax提交的数据，没有显示效果
        pageSize: 7,                             //修改“每页展示条数”将按照此数值动态创建显示条目数
        data: [{
            id: 1,
            fodderNum: 25336,
            fodderName: '据已多',
            fileSrc: '../imgs/a0.mp3'
        },
            {
                id: 2,
                fodderNum: 11460,
                fodderName: '交没其',
                fileSrc: '../imgs/a0.mp3'
            },
            {
                id: 3,
                fodderNum: 16655,
                fodderName: '规了牌',
                fileSrc: '../imgs/a0.mp3'
            },
            {
                id: 4,
                fodderNum: 21754,
                fodderName: '的地得',
                fileSrc: '../imgs/a0.mp3'
            },
            {
                id: 5,
                fodderNum: 17767,
                fodderName: '份停统',
                fileSrc: '../imgs/a0.mp3'
            },
            {
                id: 6,
                fodderNum: 13985,
                fodderName: '的高创',
                fileSrc: '../imgs/a0.mp3'
            },
            {
                id: 7,
                fodderNum: 22742,
                fodderName: '交趋装',
                fileSrc: '../imgs/a0.mp3'
            },
            {
                id: 8,
                fodderNum: 27716,
                fodderName: '林了牌',
                fileSrc: '../imgs/a0.mp3'
            },
            {
                id: 9,
                fodderNum: 11967,
                fodderName: '都称全',
                fileSrc: '../imgs/a0.mp3'
            }]
    };


    /*GET FODDERLIST S*/
    getFooderList();
    function getFooderList() {                           //第一次执行请求默认数据,成功返回绑定到搜索区域

        if (fodderDataResult.Status == 1) {
            //bindFodderBar(fodderDataResult);
            //bindPage(fodderDataResult);
            bindSearch(fodderDataResult)
        } else {
            console.log(fodderDataResult.Message)
        }

        var pageNum = 1,
            pageSize = 6;

        $.ajax({
            url: '/getList',
            type: 'GET',
            data: {
                "userId": 'xxx',
                "pageNum": pageNum,
                "pageSize": pageSize
            },
            timeout: 5000,
            success: function (data) {
                if (data.Status == 1) {
                    bindSearch(fodderDataResult)
                } else {
                    console.log(fodderDataResult.Message);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })


    }

    /*GET FODDERLIST E */


    /*BIND FOODDER BAR S*/
    function bindSearch(fodDat) {               //搜索区域整体，主要承载“内容数据绑定”，“分页页签数据绑定”两个方法，并在函数内部公共了“keyWord:查询关键字，pageNum:当前页码，pageSize:每页展示条数，turnTo:跳转到”四个数据
        var _fodDat = fodDat;
        var page = _fodDat.pageNum, count = _fodDat.pageSize, totalPage = _fodDat.totalPage, keyWord = _fodDat.keyword;

        bindFodderBar(_fodDat);
        bindPage(_fodDat);


        function bindFodderBar(fodDat) {                       //素材数据绑定
            var cons = fodDat.data;
            count = fodDat.pageSize;
            page = fodDat.pageNum;
            var str = '';
            for (var i = 0; i < count; i++) {
                str += '<tr>';
                str += '<td><div class="B-ui-table-ext">' + cons[i]['fodderNum'] + '</div></td>';
                str += '<td><div class="B-ui-table-ext">' + cons[i]['fodderName'] + '</div></td>';
                str += '<td><div class="B-ui-table-ext"><audio src="' + cons[i]['fileSrc'] + '" controls="controls"></audio> </div></td>';
                str += '</tr>';
            }
            $('#vv-search').html(str);
        }

        function bindPage(fodDat) {                          //分页绑定
            var str = '';
            for (var i = 1; i <= totalPage; i++) {
                if (page == i) {
                    str += '<a href="javascript:;" class="B-ui-page-item B-ui-page-current">' + i + '</a>';
                } else {
                    str += '<a href="javascript:;" class="B-ui-page-item">' + i + '</a>';
                }
            }
            var str2 = '<span class="B-ui-page-info"><span class="B-ui-page-bold">' + page + '/' + totalPage + '</span>页</span>';
            $(str).insertAfter($('#pagePrev'));
            $(str2).insertAfter($('#pageNext'));

            BtnProxy();
        }

        function BtnProxy() {                                        //委托的分页
            $('#pageporxy').on('click', '.B-ui-page-item', function () {
                var $aNum = $(this).html();
                $.ajax({
                    url: '/getList',
                    type: 'GET',
                    data: '?keyword=&pageNum=' + $aNum + '&pageSize=' + count + '&turnTo=',
                    timeout: 5000,
                    success: function (data) {
                        if (data.Status == 1) {
                            bindFodderBar(data)
                        } else {
                            console.log(data.Message);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            })
        }

        $('.search-submit').on('click', function () {                      //搜索提交按钮
            keyWord = $('.search-value').val();
            $.ajax({
                url: '/getList',
                type: 'GET',
                data: '?keyword=' + keyWord + '&pageNum=&pageSize=&turnTo=',
                timeout: 5000,
                success: function (data) {
                    if (data.Status == 1) {
                        bindFodderBar(data);
                        bindPage(data);
                        totalPage = con.totalPage;
                        $('.search-value').val('');
                    } else {
                        console.log(data.Message);
                        $('.search-value').val('');
                    }
                },
                error: function (err) {
                    console.log(err);
                    $('.search-value').val('');
                }
            });

        });

        $('#pagePrev').on('click', function () {                        //上一页
            if (page == 1) {
                return
            }
            page--;
            var data = 'keyword=' + keyWord + '&pageNum=' + page + '&pageSize=' + count + '&turnTo=';
            ajax('GET', '/getInfo', data, function (con) {
                bindFodderBar(con);
                bindPage(con);
                totalPage = con.totalPage;
            })
        });

        $('#pageNext').on('click', function () {                        //下一页
            if (page == totalPage) {
                return
            }
            page++;
            var data = 'keyword=' + keyWord + '&pageNum=' + page + '&pageSize=' + count + '&turnTo=';
            ajax('GET', '/getInfo', data, function (con) {
                bindFodderBar(con);
                bindPage(con);
                totalPage = con.totalPage;
            })
        });

        $('#inputTo').on('click', function () {                        //跳转
            var $inputNum = $('#turnto input').val();
            page = $inputNum;
            var data = 'keyword=' + keyWord + '&pageNum=' + $inputNum + '&pageSize=' + count + '&turnTo=' + $inputNum;
            ajax('GET', '/getInfo', data, function (con) {
                bindFodderBar(con);
                bindPage(con);
                totalPage = con.totalPage;
            })

        })
    }

    /*BIND FOODDER BAR E*/


    /*CHANGE BUTTON COUNT*/
    changeBtnCon(5, 7);
    //changeBtnCon(5, 7);//初始化方格数

    $('#fAndS').click(function () {
        $('#postab').children('tbody').html('');
        changeBtnCon(5, 7)
    });

    $('#tAndFteen').click(function () {
        $('#postab').children('tbody').html('');
        changeBtnCon(10, 14)
    });

    $('#clearBtn').click(function () {
        $('#postab').children('tbody').html('<tr></tr>');
    });


    function changeBtnCon(row, cell) {
        var postab = document.getElementById('postab');
        var posTbody = postab.getElementsByTagName('tbody')[0];
        var str = '';
        //var tagHeight = 360 / row;
        var tagWidth = 560 / cell;
        //tagWidth = tagWidth.toFixed(2);
        for (var i = 0; i < row; i++) {                 //循环绑定行和列
            var ai = i + 1;
            str += '<tr>';
            for (var j = 0; j < cell; j++) {
                var aj = j + 1;
                str += '<td style="padding:0px;margin:0px;"><input type="text" btnType="0" focused="false" value="" positons="' + ai + '-' + aj + '" style="width:' + tagWidth + 'px;Transparent;border:1px solid red;background-color:#fff;"></td>';
            }
            str += '</tr>';
        }
        posTbody.innerHTML = str;

        addBtnType();
    }

    /*CHANGE BUTTON COUNT*/


    /*ADD BUTTON TYPE S*/
    function addBtnType(){


        $('#postab tbody input').focus(function () {             //鼠标点选中变色
            $(this).css('background-color', '#c9caca')
        });
        $('#postab tbody tr input').blur(function () {           //失去焦点变回白色
            $(this).css('background-color', '#fff')
        });

        $('#postab tbody tr input').on('focusout', function () {    //上一秒获得过焦点的input，在失去焦点后将遍历除自己以外所有tbody的中的input将其中focused DOM属性值设为flase，随后将自己设为true
            $(this).parent().children('input').prop('focused', false);
            $(this).prop('focused', true);
        });


        $('#addType1').on('click', function () {         //点击type1将遍历tbody中的所有input，将其focused的值做为判断条件，true则设置按钮类型btntype为1。
            $('#postab tbody td input').each(function () {
                if ($(this).prop('focused')) {
                    //console.log($(this));
                    $(this).attr('btnType', '1');
                    $('#postab tbody tr input').prop('focused', false);
                }
            });
        });

        $('#addType2').on('click', function () {          //type2按钮同上面的功能代码冗余，可以使用事件委托制作。
            $('#postab tbody td input').each(function () {
                if ($(this).prop('focused')) {
                    $(this).attr('btnType', '2');
                    $('#postab tbody tr input').prop('focused', false);
                }
            });
        });
        $('#addType3').on('click', function () {        //type3按钮同上功能
            $('#postab tbody td input').each(function () {
                if ($(this).prop('focused')) {
                    $(this).attr('btnType', '3');
                    $('#postab tbody tr input').prop('focused', false);
                }
            });
        });

        $('#addType4').on('click', function () {        //type4按钮清零
            $('#postab tbody td input').each(function () {
                if ($(this).prop('focused')) {
                    $(this).attr('btnType', '0');
                    $('#postab tbody tr input').prop('focused', false);
                }
            });
        });


    }
    /*ADD BUTTON TYPE E*/





    /*SAVE DATA BUTTON*/
    $('.page-bookPagePosition-table-button button[type=submit]').click(function () {
        var num = $('#postab tbody tr').length;                  //得到行数
        var numCell = $('#postab tbody tr input').length / num;  //得到每行的单元格
        var btnSaveData = {};
        var arr = [];

        $('#postab tbody td input').each(function (index) {      //遍历取出所有的value和positons值
            var positons = $(this).attr('positons');
            var btnType = $(this).attr('btnType');
            var value = $(this).val();
            var single = {};
            single.name = positons;
            single.btnType = btnType;
            single.value = value;
            arr.push(single);
        });

        for (var i = 1; i < num + 1; i++) {                     // 以行为单位，line（n）为键名存入对象
            var cur = 'line' + i;
            btnSaveData[cur] = arr.splice(0, numCell);
        }
        var data = JSON.stringify(btnSaveData);                 //以JSON接口形式保存，发送服务器存储

        alert(data);
        $.ajax({
            url: '/',
            type: 'POST',
            data: data,
            timeout: 5000,
            success: function (result) {
                if (result.Status == 1) {
                    console.log('success');
                } else {
                    console.log('data error');
                }
            },
            error: function (err) {
                console.log('process error');
            }
        });
    });
    /*SAVE DATA BUTTON*/


    /*GO BACK BUTTON*/
    $('.page-bookPagePosition-table-button button[type=button]').click(function () {   //返回按钮
        window.location.href = "/";
    });
    /*GO BACK BUTTON*/


    /*Utils S*/
    function ajax(method, url, data, callback) {
        $.ajax({
            url: url,
            type: method,
            data: data,
            cache: false,
            timeout: 5000,
            success: callback,
            error: function () {
                console.log('process error');
            }
        });
    }

    /*Utils E*/


    /*SETRemainTime S*/
    if ($('#v4 video[src$=".mp4"]').length) {                 //检测是否有包含.MP4文件的video标签，如果有则让功能显示
        $('#mp4').show();
    }

    $('#duration').click(function () {                        //获取用户输入的‘小时’‘分钟’转换成秒，以JSON字符串形式发送服务器
        var showDuration = document.getElementById('videoCtrl').duration;
        var totalTime = Math.floor(showDuration);
        var hour = $('#mp4 input[type=text]').eq(0).val();
        var min = $('#mp4 input[type=text]').eq(1).val();
        var targetTime = (hour * 120 * 60) + (min * 60);
        //var InterValObj = window.setInterval(RemainTime, 1000);
        var data = {};
        data.totalTime = totalTime;
        data.targetTime = targetTime;
        $.ajax({
            url: '/',
            type: 'POST',
            data: data,
            timeout: 5000,
            success: function (data) {
                if (result.Status == 1) {
                    alert('按钮将在' + targetTime / 60 + '分钟后显现');
                    //RemainTime(data)//这是一个倒计时方法
                } else {
                    console.log('data error');
                }
            },
            error: function (err) {
                alert('按钮将在' + targetTime / 60 + '分钟后显现');
                console.log('process error');
            }
        });
        $('#mp4 input[type=text]').eq(0).val('');
        $('#mp4 input[type=text]').eq(1).val('');
    });
    /*SETRemainTime E*/


});





















