/**
 * @author HangBo Ou <fantasyoui@gmail.com>
 * extensions: https://github.com/kayalshri/tableExport.jquery.plugin
 */

( function( $ ) {
  'use strict';
  var sprintf = $.fn.bootstrapTable.utils.sprintf;

  $.extend( $.fn.bootstrapTable.defaults, {
    showImport: false
  } );

  $.extend( $.fn.bootstrapTable.defaults.icons, {
    import: 'glyphicon-import icon-share'
  } );

  $.extend( $.fn.bootstrapTable.locales, {
    formatExport: function() {
      return 'Import data';
    }
  } );
  $.extend( $.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales );

  var BootstrapTable = $.fn.bootstrapTable.Constructor, _initToolbar = BootstrapTable.prototype.initToolbar;

  BootstrapTable.prototype.initToolbar = function() {
    this.showToolbar = this.options.showImport;

    _initToolbar.apply( this, Array.prototype.slice.apply( arguments ) );

    if( this.showToolbar ) {
      var //
        $btnGroup = this.$toolbar.find( '>.btn-group' ), $import = $btnGroup.find( 'div.import' );
      console.log( 'this.options.extend.import_url', this.options.extend.import_url );
      console.log( 'Fast', Fast );
      console.log( 'table', table );

      if( !$import.length ) {
        $import = $( [ //
          '<div class="import btn-group">', //
          '<button class="btn btn-import' + //
          sprintf( ' btn-%s', this.options.buttonsClass ) + //
          sprintf( ' btn-%s', this.options.iconSize ) + //
          ' dropdown-toggle" aria-label="import type" ' + //
          'title="' + this.options.formatImport() + '" ' + //
          'type="button">', sprintf( '<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons.import ), //
          '</button>', //
          '</div>' ].join( '' ) ).appendTo( $btnGroup );

        if( typeof require !== 'function' ) {
          throw new Error( "RequireJS not found" );
        }
        require( [ 'upload' ], ( Upload ) => {
          Upload.api.upload( $( '.btn-import', $import ), ( data, ret ) => {
            console.log( data, ret );
            Fast.api.ajax( {
              url: this.options.extend.import_url, data: { file: data.url },
            }, function( data, response ) {
              console.log( data, response );
              Layer.confirm( '<div style=" color: red; ">策划书测试</div>', {}, function( index ) {

                layer.close( index );
              }, function( index ) {

                layer.close( index );
              } );
              // table.trigger( "uncheckbox" );
              // table.bootstrapTable( 'refresh' );
            } );
          } );
        } );
      }
    }
  };
} )( jQuery );
