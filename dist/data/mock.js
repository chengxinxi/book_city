var homeJson = require('./home.json');
var data1 = require('./recommend1.json');
var data2 = require('./recommend2.json');
var data3 = require('./recommend3.json');
var search_list = require('./searchKey.json');
var search_data = require('./search.json');
var detail_json = require('./352876.json');
var read1_json = require('./reader/data1.json');
var read2_json = require('./reader/data2.json');
var read3_json = require('./reader/data3.json');
var read4_json = require('./reader/data4.json');
var chapterlist = require('./chapter-list.json');





var mockdata = {
    '/book/init': homeJson,
    '/book/list?init=1&limit=10': data1,
    '/book/list?init=2&limit=10': data2,
    '/book/list?init=3&limit=10': data3,
    '/book/search': search_list,
    '/book/searchdata': search_data,
    '/book/detail?active=352876': detail_json,
    '/book/readjson?article=1': read1_json,
    '/book/readjson?article=2': read2_json,
    '/book/readjson?article=3': read3_json,
    '/book/readjson?article=4': read4_json,
    '/book/chapterlist': chapterlist


}

module.exports = function(url) {
    if (/\/book\/searchdata\?/.test(url)) {
        url = '/book/searchdata';
    }
    return mockdata[url]
}