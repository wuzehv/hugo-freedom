// 动态添加表格样式
$('table').attr('class', 'table table-bordered table-striped table-dark');

// 搜索功能
(function() {
	var Search = {
		// 搜索展示的数据条数
		url: "https://liangjun.work/es/es/_search?source_content_type=application/json&source=",
		btn: $("#search-btn"),
		input: $("#search-input"),
		source: {
			"_source": ["uri", "title", "tags"],
			"query": {
				"match": {
					"content": ''
				}
			},
			"highlight": {
				"pre_tags": ["<code>"],
				"post_tags": ["</code>"],
				"fields": {
					"content": {}
				}
			},
			"size": 5
		},
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

				_this.source.query.match.content = content;
				var source = JSON.stringify(_this.source);

				$.ajax({
					url: _this.url + source,
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
					res += "<p>" + content[i].highlight.content[0] + "</p>";
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

	Search.bind();
})();