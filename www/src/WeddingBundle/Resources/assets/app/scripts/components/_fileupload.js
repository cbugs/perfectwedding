$(function() {
    console.log("image upload");
    let imgUploadElemData = [];
    $("[data-image-upload]").each(function(i,e){
        imgUploadElemData[i] = JSON.parse($(this).attr('data-image-upload'))[0];
        console.log(imgUploadElemData[i]);
        let elem = $('<form id="'+imgUploadElemData[i].name+'" method="post" enctype="multipart/form-data" style="display:none;"><input type="file" name="'+imgUploadElemData[i].name+'"></form>');
        $('body').append(elem);

        $(this).on('click', function(){
            $("#"+imgUploadElemData[i].name).find('input').click();
        });

        $("#"+imgUploadElemData[i].name).submit(function(){
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: imgUploadElemData[i].url, 
                type: 'POST',
                data: formData,
                async: false,
                success: function(data)   
                {
                    $("#"+imgUploadElemData[i].for).attr('src',data.response);
                },
                error: function(data)
                {
                    console.error("error: "+data);
                },
                cache: false,
                contentType: false,
                processData: false
            });

            return false;
        });

        $($("#"+imgUploadElemData[i].name).find('input')).on('change', (e)=>{
            $("form#"+imgUploadElemData[i].name).submit();
        });
    });
});