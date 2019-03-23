layui.use(['form', 'layer', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        // url : '../../json/userList.json',
        data: [{
            "fileId": "1",
            "filename": "倚天屠龙记",
            "checktime": "2018-10-11 08:00",
            "contents": "张无忌朗声道：“晚辈学过贵派的一些七伤拳法，倘若练得不对，请崆峒派各位前辈切莫见笑。”各派人众听了，尽皆诧异：“这小子原来连崆峒派的七伤拳也会，那是从何处学来啊？”只听他朗声念道：“五行之气调阴阳，损心伤肺摧肝肠，藏离精失意恍惚，三焦齐逆兮魂魄飞扬！”别派各人听到，那也罢了。崆峒五老听到他高吟这四句似歌非歌、似诗非诗的拳诀，却无不凛然心惊。这正是七伤拳的总诀，乃崆峒派的不传之秘，这少年如何知道？他们一时之间，怎想得到谢逊将七伤拳谱抢去后，传了给他。"
        }, {
            "filesId": "2",
            "filename": "笑傲江湖",
            "checktime": "2018-10-11 09:00",
            "contents": "这时岳灵珊出招越来越快，令狐冲瞧着她婀娜的身形，想起昔日同在华山练剑的情景，不由得痴了，眼见她一剑刺到，顺手还了一招。"
        }],
        // data: json_data,
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 20,
        even: true,
        id: "userListTable",
        cols: [
            [
                { type: "checkbox", fixed: "left", width: 50 },
                { field: 'filename', title: '文件名称', minWidth: 100, align: "center" },
                { field: 'checktime', title: '修改日期', minWidth: 100, align: "center", sort: true, },
                { field: 'contents', title: '搜索结果', minWidth: 100, align: "center" },
                { title: '操作', minWidth: 175, templet: '#userListBar', fixed: "right", align: "center" }
            ]
        ]
    });

    // 关键字搜索
    form.on("submit(search_btn)", function(data) {
        var click_count = parseInt($("#click_count").text()) + 1;
        console.log(click_count);
        $("#click_count").text(new String(click_count));
        var keyword = data.field.keyword;
        var post_data = data.field;
        console.log(post_data);
        $.ajax({
            url: "searesult",
            type: "post",
            data: post_data,
            success: function(data) {
                var newjson = data;
                var searchtext = $('#keyword').val();;
                console.log(searchtext);
                // tableIns.reload();
                table.render({
                    elem: '#userList',
                    // url : '../../json/userList.json',
                    // data: [{
                    //     "fileId": "1",
                    //     "filename": "倚天屠龙记",
                    //     "checktime": "2018-10-11 08:00",
                    //     "contents": "张无忌朗声道：“晚辈学过贵派的一些七伤拳法，倘若练得不对，请崆峒派各位前辈切莫见笑。”各派人众听了，尽皆诧异：“这小子原来连崆峒派的七伤拳也会，那是从何处学来啊？”只听他朗声念道：“五行之气调阴阳，损心伤肺摧肝肠，藏离精失意恍惚，三焦齐逆兮魂魄飞扬！”别派各人听到，那也罢了。崆峒五老听到他高吟这四句似歌非歌、似诗非诗的拳诀，却无不凛然心惊。这正是七伤拳的总诀，乃崆峒派的不传之秘，这少年如何知道？他们一时之间，怎想得到谢逊将七伤拳谱抢去后，传了给他。"
                    // }, {
                    //     "filesId": "2",
                    //     "filename": "笑傲江湖",
                    //     "checktime": "2018-10-11 09:00",
                    //     "contents": "这时岳灵珊出招越来越快，令狐冲瞧着她婀娜的身形，想起昔日同在华山练剑的情景，不由得痴了，眼见她一剑刺到，顺手还了一招。"
                    // }],
                    data: newjson,
                    cellMinWidth: 95,
                    page: true,
                    height: "full-125",
                    limits: [10, 15, 20, 25],
                    limit: 20,
                    even: true,
                    id: "userListTable",
                    cols: [
                        [
                            { type: "checkbox", fixed: "left", width: 50 },
                            { field: 'filename', title: '文件名称', minWidth: 100, align: "center" },
                            { field: 'checktime', title: '修改日期', minWidth: 100, align: "center", sort: true, },
                            { field: 'contents', title: '搜索结果', minWidth: 100, align: "center" },
                            { title: '操作', minWidth: 175, templet: '#userListBar', fixed: "right", align: "center" }
                        ]
                    ]
                });
                //1.获取要高亮显示的行
                var rowNode = $('.laytable-cell-'+new String(click_count)+'-contents');
                // console.log(rowNode);
                //2.遍历整行内容，添加高亮颜色
                rowNode.each(function() {
                    var word = $(this).html();
                    // console.log(word);
                    word = word.replace(searchtext, '<span style="color:red;">' + searchtext + '</span>');
                    $(this).html(word);
                });
            },
            error: function(res) {
                console.log(res);
            },
        });
        return false;
    });

    // 修改搜索目录
    form.on("submit(dir_btn)", function(data) {
        $.ajax({
            url: "rootdir",
            type: "post",
            data: { "change_dir": 1 },
            success: function(data) {
                layer.msg(data);
            },
            error: function(res) {
                console.log(res);
            },
        });
        return false;
    });

    //详细
    function lookResult(look) {
        // document.getElementById("#maj").style.display= "";
        var index = layui.layer.open({
            title: "详情",
            type: 1,
            btn: '关闭',
            area: ["700px", "480px"],
            id: "lookLog",
            content: $('#lookResult'),
            success: function(layero, index) {
                // var body = layui.layer.getChildFrame('body', index);
                var searchtext = $('#keyword').val();
                var body = $('#lookResult');
                if (look) {
                    body.find("#logsort").val(look.filename);
                    body.find("#lookedate").val(look.checktime);
                    body.find("#pcloudcontent").html(look.contents);
                    // form.render('select', 'selFilter');
                    form.render();
                };
                setTimeout(function() {
                    layui.layer.tips('点击此处返回日志列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
                var word = $('#pcloudcontent').html();
                console.log(word);
                word = word.replace(searchtext, '<span style="color:red;">' + searchtext + '</span>');
                $('#pcloudcontent').html(word);
            }
        })
        // layui.layer.full(index);
        // //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        // $(window).on("resize",function(){
        //     layui.layer.full(index);
        // })
    };

    //批量删除
    $(".delAll_btn").click(function() {
        var checkStatus = table.checkStatus('userListTable'),
            data = checkStatus.data,
            account = [];
        if (data.length > 0) {
            for (var i in data) {
                account.push(data[i].account);
            }
            console.log(account);
            layer.confirm('确定删除选中的用户？', { icon: 3, title: '提示信息' }, function(index) {
                // $.get("/data_delete",{
                // account: account //将需要删除的account作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        } else {
            layer.msg("请选择需要删除的用户");
        }
    })

    //列表操作
    table.on('tool(userList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            lookResult(data);
        } else if (layEvent === 'usable') { //启用禁用
            var _this = $(this),
                usableText = "是否确定禁用此用户？",
                btnText = "已禁用";
            if (_this.text() == "已禁用") {
                usableText = "是否确定启用此用户？",
                    btnText = "已启用";
            }
            layer.confirm(usableText, {
                icon: 3,
                title: '系统提示',
                cancel: function(index) {
                    layer.close(index);
                }
            }, function(index) {
                _this.text(btnText);
                layer.close(index);
            }, function(index) {
                layer.close(index);
            });
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此条记录？', { icon: 3, title: '提示信息' }, function(index) {
                obj.del();
                layer.close(index);
            });
        } else if (layEvent === 'look') { //预览
            lookResult(data);
        }
    });

})