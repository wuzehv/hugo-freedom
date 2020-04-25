// 动态添加表格样式
$('table').attr('class', 'table table-bordered table-striped table-dark');

// 搜索功能
(function() {
	var Search = {
		// 搜索展示的数据条数
		url: "https://liangjun.work/es/es/_search?q=content:",
		size: 5,
		btn: $("#search-btn"),
		input: $("#search-input"),
		_width: function() {
			return $(window).width() >= 960 ? '960px' : '90%';
		},
		bind: function() {
			var _this = this;
			this.btn.click(function() {
				var content = $.trim(_this.input.val());
				if (content.length < 3) {
					return false;
				}

				$.ajax({
					url: _this.url + content + "&size=" + _this.size + "&source={"highlight" : {"fields" : {"desc" : {}}}"
					beforeSend: function() {
						_this.load = layer.load(1);
						_this.btn.attr('disabled', 'disabled');
					},
					success: function(data) {
						layer.close(_this.load);
						var html = _this.render(data);
						layer.open({
							type: 1,
							title: '检索结果',
							skin: 'layui-layer-rim',
							area: [_this._width(), '90%'],
							content: html
						});
					},
					error: function() {
						layer.close(_this.load);
						_this.btn.removeAttr('disabled');
					},
					complete: function() {
						_this.btn.removeAttr('disabled');
					},
				});
			});
		},
		// json解析并生成html元素返回
		render: function(data) {
			var res = "<div class=\"p-3\">"
			if (data.hits.hits.length > 0) {
				var content = data.hits.hits;
				for (var i in content) {
					res += "<h5><a href='/posts" + content[i]._source.uri + "'>" + content[i]._source.title + "</a></h5>";
				}
			} else {
				res += "<div class=\"alert alert-danger text-center\" role=\"alert\">" + 
					"没有检索到结果，试试其他关键字 :)" + 
					"</div>";
			}
			res += "</div>";

			return res;
		}
	};

	// Search.test();
	Search.bind();
})();
// $.get("https://liangjun.work/es/es/_search?q=content:fulltext index&size=5", '', function(data) {
// 	console.log(data);
// });