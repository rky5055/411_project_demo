$(document).ready(function () {
    // example: https://getbootstrap.com/docs/4.2/components/modal/
    // show modal
    $('#task-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget) // Button that triggered the modal
        const LPId = button.data('source') // Extract info from data-* attributes
        const LPName = button.data('LPName') // Extract info from data-* attributes
        const address = button.data('address')
        const price = button.data('price')
        const rating = button.data('rating')
        const leaseOption = button.data('leaseOption')
        const website = button.data('website')

        const modal = $(this)
        if (LPId === 'New LivePlace') {
            modal.find('.modal-title').text(LPId)
            $('#task-form-display').removeAttr('LPId')
        } else {
            modal.find('.modal-title').text('Edit LivePlace ' + LPId)
            $('#task-form-display').attr('LPId', LPId)
        }

        if (LPName) {
            modal.find('.form-control').val(LPName);
        } else {
            modal.find('.form-control').val('');
        }

        if (address) {
            modal.find('.form-control').val(address);
        } else {
            modal.find('.form-control').val('');
        }

        if (price) {
            modal.find('.form-control').val(price);
        } else {
            modal.find('.form-control').val('');
        }

        if (rating) {
            modal.find('.form-control').val(rating);
        } else {
            modal.find('.form-control').val('');
        }

        if (leaseOption) {
            modal.find('.form-control').val(leaseOption);
        } else {
            modal.find('.form-control').val('');
        }

        if (website) {
            modal.find('.form-control').val(website);
        } else {
            modal.find('.form-control').val('');
        }

    })


    $('#submit-LivePlace').click(function () {
        const tID = $('#task-form-display').attr('LPId');
        console.log($('#task-modal').find('.form-control').val())
        $.ajax({
            type: 'POST',
            url: tID ? '/edit/' + tID : '/create',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'LPName': $('#task-modal').find('.form-control1').val(),
                'address': $('#task-modal').find('.form-control2').val(),
                'price': $('#task-modal').find('.form-control3').val(),
                'rating': $('#task-modal').find('.form-control4').val(),
                'leaseOption': $('#task-modal').find('.form-control5').val(),
                'website': $('#task-modal').find('.form-control6').val()
            }),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    $('.remove').click(function () {
        const remove = $(this)
        $.ajax({
            type: 'POST',
            url: '/delete/' + remove.data('source'),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    // $('.state').click(function () {
    //     const state = $(this)
    //     const tID = state.data('source')
    //     const new_state
    //     if (state.text() === "In Progress") {
    //         new_state = "Complete"
    //     } else if (state.text() === "Complete") {
    //         new_state = "Todo"
    //     } else if (state.text() === "Todo") {
    //         new_state = "In Progress"
    //     }

    //     $.ajax({
    //         type: 'POST',
    //         url: '/edit/' + tID,
    //         contentType: 'application/json;charset=UTF-8',
    //         data: JSON.stringify({
    //             'status': new_state
    //         }),
    //         success: function (res) {
    //             console.log(res)
    //             location.reload();
    //         },
    //         error: function () {
    //             console.log('Error');
    //         }
    //     });
    // });

});