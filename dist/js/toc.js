(function() {
  var $sideToc, html, sideTocCreater, tocHelper;

  tocHelper = function($obj, options) {
    var $headings, className, firstLevel, headingsMaxDepth, headingsSelector, i, j, lastLevel, lastNumber, listNumber, ref, ref1, result;
    if (options == null) {
      options = {};
    }
    headingsMaxDepth = options.headingsMaxDepth || 6;
    headingsSelector = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, headingsMaxDepth).join(',');
    $headings = $obj.find(headingsSelector);
    if (!$headings.length) {
      return '';
    }
    className = options["class"] || 'toc';
    listNumber = options.list_number || true;
    result = "<ol class='" + className + "'>";
    lastNumber = [0, 0, 0, 0, 0, 0];
    firstLevel = 0;
    lastLevel = 0;
    i = 0;
    $headings.each(function() {
      var id, j, k, l, level, ref, ref1, ref2, ref3, ref4, text;
      console.log(this);
      level = +this.tagName[1];
      id = $(this).attr('id');
      text = $(this).text();
      lastNumber[level - 1]++;
      for (i = j = ref = level; ref <= 5 ? j <= 5 : j >= 5; i = ref <= 5 ? ++j : --j) {
        lastNumber[i] = 0;
      }
      if (firstLevel) {
        if (level > lastLevel) {
          result += '<ol class="' + className + '-child">';
        } else {
          for (i = k = ref1 = level, ref2 = lastLevel; ref1 <= ref2 ? k < ref2 : k > ref2; i = ref1 <= ref2 ? ++k : --k) {
            result += '</li></ol>';
          }
          result += '</li>';
        }
      } else {
        firstLevel = level;
      }
      result += '<li class="' + className + '-item ' + className + '-level-' + level + '">';
      result += '<a class="' + className + '-link" href="#' + id + '">';
      if (listNumber) {
        result += '<span class="' + className + '-number">';
        for (i = l = ref3 = firstLevel - 1, ref4 = level; ref3 <= ref4 ? l < ref4 : l > ref4; i = ref3 <= ref4 ? ++l : --l) {
          result += lastNumber[i] + '.';
        }
        result += '</span> ';
      }
      result += '<span class="' + className + '-text">' + text + '</span></a>';
      return lastLevel = level;
    });
    for (i = j = ref = firstLevel - 1, ref1 = lastLevel; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
      result += '</li></ol>';
    }
    return result;
  };

  sideTocCreater = function() {
    var $cont, result;
    $cont = $('#markdown-container .markdown-body');
    result = tocHelper($cont);
    return "<div class=\"toc-box affix-top\"> <div class=\"toc-heading\">文章目录</div> <div class=\"toc-body\"> <div class=\"toc-cont\"> <div class=\"highlight-title\"></div> " + result + " </div> </div> </div>";
  };

  html = sideTocCreater();

  $sideToc = $('<div>', {
    "class": 'col-md-3'
  });

  $sideToc.html(html);

  $('#markdown-container').addClass('col-md-9').removeClass('col-md-10 col-md-offset-1').after($sideToc);

}).call(this);
