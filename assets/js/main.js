$(document).ready(function() {
  var wikiSearch = {
    searchTerm: '',
    apiURL: '',
    update: function() {
      this.searchTerm = $('#search-term').val();
      this.apiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
                  + this.searchTerm
                  + '&limit=10&namespace=0&format=json';
    },
    search: function() {
      this.update();
      if (this.searchTerm.length) {
        wikiSearch.reset();
        $('.wrap').css({'top': '0%'});
        $.ajax({
          url: this.apiURL,
          dataType: 'jsonp',
          success: function(data) {
            var i,
                html = '';
            $('#results').css({'display': 'block'});
            for (i = 0; i < data[1].length; i++) {
              html = '<a href="' + data[3][i]
                    + '" target="_blank" rel="noopener noreferrer" class="wiki-result"><li><span class="title">'
                    + data[1][i] + '</span><br><span class="snippet">'
                    + data[2][i] + '</span></li></a>';
                    $('#results, ul').append(html);
            }
            $('#results').css({'max-height': '9000px'});
            $.each($('.wiki-result'), function(i, el) {
              $(el).css({'opacity': 0, 'margin-top': '50px'});
              setTimeout(function() {
                $(el).animate({'opacity': 1, 'margin-top': 0}, 200);
              }, 300 + (100 * i));
            });
            // $('#results, a').css('display','block').addClass('result-animate');
          },
          error: function() {
            $('#results').text('Oops! Something went wrong. Please refresh and try again.');
          }
        });
      }
    },
    reset: function() {
      $('#results').text('');
    }
  };

  submitQuery = function() {
    wikiSearch.search();
  }
});
