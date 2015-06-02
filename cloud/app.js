// 在 Cloud code 里初始化 Express 框架
/*
 var express = require('express');
 var app = express();

 // App 全局配置
 app.set('views','cloud/views');   // 设置模板目录
 app.set('view engine', 'ejs');    // 设置 template 引擎
 app.use(express.bodyParser());    // 读取请求 body 的中间件
 */
// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var avosExpressCookieSession = require('avos-express-cookie-session');

// App 全局配置
app.set('views', 'cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件
app.use(express.cookieParser('ahdsfashfjdsahdjfsh'));
// 使用 avos-express-cookie-session 记录登录信息到 cookie
app.use(avosExpressCookieSession({cookie: {maxAge: 3600000}, fetchUser: true}));


// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
// index page


app.get('/hello', function (req, res) {
    res.render('hello', {message: 'Congrats, you just set up your app!'});
});
app.get('/content', function (req, res) {
    res.render('content');
});
app.get('/article_list', function (req, res) {
    res.render('article_list');
});
app.get('/channel_2ji', function (req, res) {
    res.render('channel_2ji');
});
app.get('/channel_2ji/:id', function (req, res) {
    /*文章、区域、flash、大学、横幅广告、*param 相关区域、相关版块*/
    var cql_cou_co = 'select * from country where objectId = ?';
    var cql_cou_all = 'select name from country';
    var cql_fl_co = 'select * from flash where position = ?';
    var cql_ad_to = 'select * from advertisement where position = "二级页"';
    var cql_uni_co = 'select * from university where parent in (?) limit 10';
    var cql_ar_find = 'select title from article where parent in (select * from plate where name is exists and name = ?) and country = ? limit 8 order by updateAt desc';


    AV.Query.doCloudQuery(cql_cou_co, [req.params.id], {
        success: function (cou_co) {
            AV.Query.doCloudQuery(cql_fl_co,[cou_co.results[0].get('name')], {
                success: function (flash) {
                    AV.Query.doCloudQuery(cql_ad_to, {
                        success: function (ad_to) {
                            AV.Query.doCloudQuery(cql_uni_co, [cou_co.results[0]], {
                                success: function (uni_co) {
                                    AV.Query.doCloudQuery(cql_cou_all, {
                                        success: function (cou_all) {
                                            AV.Query.doCloudQuery(cql_ar_find, ["申请必读", cou_co.results[0].get('name')], {
                                                success: function (ar_read) {
                                                    AV.Query.doCloudQuery(cql_ar_find, ["申请必读", cou_co.results[0].get('name')], {
                                                        success: function (ar_read) {
                                                            AV.Query.doCloudQuery(cql_ar_find, ["申请必读", cou_co.results[0].get('name')], {
                                                                success: function (ar_read) {
                                                                    AV.Query.doCloudQuery(cql_ar_find, ["申请必读", cou_co.results[0].get('name')], {
                                                                        success: function (ar_read) {
                                                                            AV.Query.doCloudQuery(cql_ar_find, ["申请必读", cou_co.results[0].get('name')], {
                                                                                success: function (ar_read) {
                                                                                    AV.Query.doCloudQuery(cql_ar_find, ["申请必读", cou_co.results[0].get('name')], {
                                                                                        success: function (ar_read) {
                                                                                            res.render("channel_2ji",{
                                                                                                 cou_co_current:cou_co.results[0]
                                                                                                ,cou_co:cou_all.results
                                                                                                ,flash:flash.results
                                                                                            });
                                                                                        },
                                                                                        error: function (error) {
                                                                                            console.log("Error: " + error.code + " " + error.message);
                                                                                        }
                                                                                    });
                                                                                },
                                                                                error: function (error) {
                                                                                    console.log("Error: " + error.code + " " + error.message);
                                                                                }
                                                                            });
                                                                        },
                                                                        error: function (error) {
                                                                            console.log("Error: " + error.code + " " + error.message);
                                                                        }
                                                                    });
                                                                },
                                                                error: function (error) {
                                                                    console.log("Error: " + error.code + " " + error.message);
                                                                }
                                                            });
                                                        },
                                                        error: function (error) {
                                                            console.log("Error: " + error.code + " " + error.message);
                                                        }
                                                    });
                                                },
                                                error: function (error) {
                                                    console.log("Error: " + error.code + " " + error.message);
                                                }
                                            });
                                        },
                                        error: function (error) {
                                            console.log("Error: " + error.code + " " + error.message);
                                        }
                                    });
                                },
                                error: function (error) {
                                    console.log("Error: " + error.code + " " + error.message);
                                }
                            });
                        },
                        error: function (error) {
                            console.log("Error: " + error.code + " " + error.message);
                        }
                    });
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});


app.get('/list', function (req, res, next) {
    AV.Query.doCloudQuery('select * from article', {
        success: function (result) {
            var results = result.results;


            for (var i = 0; i < results.length; i++) {

                console.log(results[i].createdAt);
                results[i].createdAt = formatTime(results[i].createdAt);
                // console.log(object.id + ' - ' + object.get('title'));
            }

            res.render("list", {article: results});
        },
        error: function (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});

app.get('/', function (req, res, next) {

    /*申请必读、模块CQL*/
    var cql_ar_find = 'select title from article where parent in (select * from plate where name is exists and name = ?) and country = ? limit ? order by updateAt desc';
    /*flash、模块CQL*/
    var cql_flash = 'select * from flash where position = "首页" limit 3 order by updateAt asc';
    /*相关国家、模块CQL*/
    var cou_co_cql = 'select * from country';



    AV.Query.doCloudQuery(cql_ar_find, ['申请必读','澳洲版块',8], {
        success: function (ar_au_bd) {
            AV.Query.doCloudQuery(cql_ar_find, ['申请必读','英国版块',8], {
                success: function (ar_en_bd) {
                    AV.Query.doCloudQuery(cql_ar_find, ['申请必读','新西兰版块',8], {
                        success: function (ar_ze_bd) {
                            AV.Query.doCloudQuery(cql_flash, {
                                success: function (flash) {
                                    AV.Query.doCloudQuery(cou_co_cql, {
                                        success: function (cou_co) {
                                            AV.Query.doCloudQuery(cql_ar_find, ['申请流程','澳洲版块',4], {
                                                success: function (ar_au_lc) {
                                                    AV.Query.doCloudQuery(cql_ar_find, ['申请流程','英国版块',4], {
                                                        success: function (ar_en_lc) {
                                                            AV.Query.doCloudQuery(cql_ar_find, ['申请流程','新西兰版块',4], {
                                                                success: function (ar_ze_lc) {
                                                                    AV.Query.doCloudQuery(cql_ar_find, ['澳洲学习和生活','澳洲版块',4], {
                                                                        success: function (ar_au_xx) {
                                                                            AV.Query.doCloudQuery(cql_ar_find, ['英国学习和生活','英国版块',4], {
                                                                                success: function (ar_en_xx) {
                                                                                    AV.Query.doCloudQuery(cql_ar_find, ['新西兰学习和生活','新西兰版块',4], {
                                                                                        success: function (ar_ze_xx) {
                                                                                            res.render("index.ejs", {
                                                                                                ar_au_bd: ar_au_bd.results
                                                                                                ,
                                                                                                ar_au_lc: ar_au_lc.results
                                                                                                ,
                                                                                                ar_au_xx: ar_au_xx.results
                                                                                                ,
                                                                                                ar_en_bd: ar_en_bd.results
                                                                                                ,
                                                                                                ar_en_lc: ar_en_lc.results
                                                                                                ,
                                                                                                ar_en_xx: ar_en_xx.results
                                                                                                ,
                                                                                                ar_ze_bd: ar_ze_bd.results
                                                                                                ,
                                                                                                ar_ze_lc: ar_ze_lc.results
                                                                                                ,
                                                                                                ar_ze_xx: ar_ze_xx.results
                                                                                                ,
                                                                                                flash: flash.results
                                                                                                ,
                                                                                                cou_co: cou_co.results
                                                                                            });
                                                                                        },
                                                                                        error: function (error) {
                                                                                            console.log("Error: " + error.code + " " + error.message);
                                                                                        }
                                                                                    });
                                                                                },
                                                                                error: function (error) {
                                                                                    console.log("Error: " + error.code + " " + error.message);
                                                                                }
                                                                            });
                                                                        },
                                                                        error: function (error) {
                                                                            console.log("Error: " + error.code + " " + error.message);
                                                                        }
                                                                    });
                                                                },
                                                                error: function (error) {
                                                                    console.log("Error: " + error.code + " " + error.message);
                                                                }
                                                            });
                                                        },
                                                        error: function (error) {
                                                            console.log("Error: " + error.code + " " + error.message);
                                                        }
                                                    });
                                                },
                                                error: function (error) {
                                                    console.log("Error: " + error.code + " " + error.message);
                                                }
                                            });
                                        },
                                        error: function (error) {
                                            console.log("Error: " + error.code + " " + error.message);
                                        }
                                    });
                                },
                                error: function (error) {
                                    console.log("Error: " + error.code + " " + error.message);
                                }
                            });
                        },
                        error: function (error) {
                            console.log("Error: " + error.code + " " + error.message);
                        }
                    });
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});


/*根据文章的ID 查询对应的文章、和相关文章*/
app.get('/content/:id', function (req, res) {

    //当前文章 CQL;
    var ar_cu_cql = 'select * from article where objectId="' + req.params.id + '" limit 1';
    //相关文章 CQL;
    var ar_co_cql = 'select title from article where tag like "%?%" limit 10 order by updateAt desc';
    //相关横幅广告 CQL;
    var ad_co_cql = 'select * from advertisement where position = ? limit 1';
    //相关国家 CQL;
    var cou_co_cql = 'select name from country';


    AV.Query.doCloudQuery(ar_cu_cql, {
        success: function (ar_cu) {
            /*ar_cu.results[i].createdAt = formatTime(ar_cu.results[i].createdAt);*/
            AV.Query.doCloudQuery(ar_co_cql, [ar_cu.results[0].get('tag')], {
                success: function (ar_co) {
                    AV.Query.doCloudQuery(ad_co_cql, ['文章页'], {
                        success: function (ad_co) {
                            AV.Query.doCloudQuery(cou_co_cql, {
                                success: function (cou_co) {
                                    res.render("content", {
                                        ar_cu: ar_cu.results[0]
                                        , ar_co: ar_co.results
                                        , ad_co: ad_co.results[0]
                                        , cou_co: cou_co.results
                                    });
                                },
                                error: function (error) {
                                    console.log("Error: " + error.code + " " + error.message);
                                }
                            });
                        },
                        error: function (error) {
                            console.log("Error: " + error.code + " " + error.message);
                        }
                    });
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});
app.get('/ar_zan/:id', function (req, res) {

    //当前文章 CQL;
    var ar_cu_cql = 'select * from article where objectId="' + req.params.id + '"';

    AV.Query.doCloudQuery(ar_cu_cql, {
        success: function (ar_cu) {
            var ar = ar_cu.results[0];
            ar.set('praise', ar.get('praise') + 1);
            ar.save({
                success: function (ar_cu) {
                    res.render("content");
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});

app.get('/detail/:id', function (req, res) {

    AV.Query.doCloudQuery('select * from article where objectId="' + req.params.id + '"', {
        success: function (result) {
            var results = result.results;
            // results[0].get('content')=html_decode(results[0].get('content'));
            // results[0].content =
            // encodeHtml(results[0].get('content'));

            res.render("detail", {article: results});
        },
        error: function (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});

/*app.post('/', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // console.log(username + ' ' + password);

    /!* Sign Up a user
     var user = new AV.User();
     user.set("username", username);
     user.set("password", password);
     user.set("displayUsername", 'ESL English');

     user.signUp(null, {
     success: function(user) {
     // Hooray! Let them use the app now.
     console.log(user);
     res.render('index.ejs', { hasError: true, errorMessage: 'OK' });
     },
     error: function(user, error) {
     console.log(user);
     console.log(error);
     res.render('index.ejs', { hasError: true, errorMessage: error.message });
     }
     });
     *!/
    AV.User.logIn(username, password, {
        success: function (user) {
            // Do stuff after successful login.
            console.log(user);
            console.log('sign in 2successfully: %j', req.AV.user);
            res.render('post.ejs', {
                displayUserName: user.attributes.displayUsername,
                hasError: false,
                hasMessage: false
            });
        },
        error: function (user, error) {

            console.log(user);
            console.log(error);
            res.render('index.ejs', {hasError: true, errorMessage: error.message});
        }
    });

    //post
    var createPost = function (req, res, file) {
        //  var articleobj = new GameScore();
        var post = new AV.Object("Article");
        post.set("title", req.body.title);
        post.set("content", req.body.hideditor);
        console.log(req.body.hideditor);
        // post.set("imgsrc",file.url())
        // console.error(error);
        post.save(null, {
            success: function (post) {
                // Execute any logic that should take place after the object is saved.
                res.render('list.ejs', {
                    displayUserName: req.AV.user.attributes.displayUsername,
                    hasError: false,
                    hasMessage: true,
                    message: 'Congratulations, you can post another article now.'
                });
            },
            error: function (post, error) {
                // Execute any logic that should take place if the save fails.
                // error is a AV.Error with an error code and description.
                // alert('Failed to create new object, with error code: ' + error.message);
            }
        });

    };
    //
    app.post('/post', function (req, res) {
        // console.log(req.body);
        if (req.AV.user) {
            if (req.body.articleImage && req.body.imageBase64) {
                var file = new AV.File(req.body.articleImage, {base64: req.body.imageBase64});
                file.save().then(function () {
                    // The file has been saved to AV.
                    createPost(req, res, file);
                }, function (error) {
                    // The file either could not be read, or could not be saved to AV.
                    console.error(error);
                    res.render('post.ejs', {hasError: true, errorMessage: error.message});
                });
            }
            else {
                createPost(req, res, null);
            }
        }
        else {
            res.redirect('/');
        }
    });

});*/

function formatTime(time) {
    var t = new Date(time);
    return t.toLocaleString();
}
//专业特殊字符串
app.locals.html_decode = function (str) {
    console.log(str);
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
};
//截取指定长度的字符串。
app.locals.sub_str = function (length, string) {
    if (string) {
        if (string.length > length) {
            return string.substr(0, length) + "......";
        }
        else {
            return string;
        }
    }
    else {
        return string;
    }
};

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();