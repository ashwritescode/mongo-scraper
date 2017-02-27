$(document).ready(function(){
    //Navbar
    $('.button-collapse').sideNav();

    //Click listener
    $('.add-comment-button').on('click', function(){
        var articleId = $(this).data('id');
        var baseURL = window.location.origin;
        var formName = 'form-add-' + articleId;
        var form = $('#' + formName);

        //AJAX to add comments
        $.ajax({
            url: baseURL + '/add/comment/' + articleId,
            type: 'POST',
            data: form.serialize(),
        })
        //Reloads window after AJAX call is complete
        .done(function(){
            location.reload();
        });
        return false;
    });

    //Listener for form submission to delete comment
    $('.delete-comment-button').on('click', function(){
        var commentId = $(this).data('id');
        var baseURL = window.location.origin;
    })
    //AJAX to delete comment
    $.ajax({
        url: baseURL + '/remove/comment/' + commentId,
        type:'POST',
    })
    .done(function() {
        location.reload();
    });
    return false;

});