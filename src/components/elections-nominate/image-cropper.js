
//Croppie script
$( document ).ready(function() {
    var $uploadCrop;
    var base64result;
    //Reads file from input stream
    //Called via image input On Change, line 137
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //Bind input file to croppie variable
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                });
                //Display relevant HTML once file selected
                $('#crop__modal').show();
                $('#cropBtn').show();
                $('.croppie-container').show();
                $('#rotate').show();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    //Setting the image preview and viewport size for cropping image on modal
    //Vary based on device to fit screen
    //If window size is tablet or below
    if ($(window).width() < 599) {
        $uploadCrop = $('#my__image--d').croppie({
            viewport: { width: 200, height: 200 },
            boundary: { width: 300, height: 300 },
            enableExif: true,
            showZoomer: true,
            enableResize: true,
            enableOrientation: true
        });

    } else {
        //Else if tablet upwards use full sized
        $uploadCrop = $('#my__image--d').croppie({
            viewport: { width: 400, height: 400 },
            boundary: { width: 600, height: 600 },
            enableExif: true,
            showZoomer: true,
            enableResize: true,
            enableOrientation: true
        });
    }

    //Rotate button
    $('.vanilla-rotate').on('click', function(ev) {
        $uploadCrop.croppie('rotate', parseInt($(this).data('deg')));
    });

    //Call readFile() when Input element changes
    $('.crop__upload').on('change', function () { readFile(this); });

    //On click of 'crop' to create cropped image
    $('#cropBtn').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            //Make sure cropped image is 400x400 and convert to base64
            size: {width: 400, height: 400},
            quality: 1,
            type: 'base64'
            //Responce is cropped image
        }).then(function (resp) {
            //Add cropped image to preview and show
            $('#upload-preview').attr('src', resp);

            //Hide modal after crop
            $('#crop__modal').hide();
            $('#preview-container').show();

            //Remove first part of base64 string
            var str = resp.substring(resp.indexOf(',') + 1);

            //Add base64 result to hidden input field
            $('.image-data').val(str);

            // alert("Image cropped!");
            // $('#election-nominate-form').submit();
            saveForm();

        });
    });
});