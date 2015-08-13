var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : '1EDs10O223Hgm7gfFxTWsJpnKMPkGj7VEEZzZB8-wxfA',
  worksheet : '1'
});

ds.fetch({ 
  success : function() {
    console.log(ds.columnNames());
    var types = _.uniq(ds.column('Type').data);
    var $content = $('#content');
    // Create a temporary view sorted by date in reverse order
    var sortedData = ds.sort(function(rowA, rowB) {
      if (new Date(rowA.Date) > new Date(rowB.Date)) {
        return -1;
      }
      if (new Date(rowA.Date) < new Date(rowB.Date)) {
        return 1;
      }
      return 0;
    });
    $content.append('<h3>My Newest Stuff</h3>');
    // Grab the first ten things for our "new" section
    for (var i=0; i<10; i++) {
      var row = sortedData.rowByPosition(i);
      $content.append('<li><strong><a href="' + row.URL + '">' + row.Name + '</a></strong>: ' + row.Description + '</li>');
    }
    _.each(types, function(type) {
      console.log(type);
      var group = ds.rows(function(row) {
        return row.Type === type;
      });
      $content.append('<h3>' + type + '</h3>');
      console.log(group.length);
      group.each(function(row) {
        $content.append('<li><strong><a href="' + row.URL + '">' + row.Name + '</a></strong>: ' + row.Description + '</li>');
      });
    });
  },
  error : function() {
    console.log('Some kinda error occurred.');
  }
});
