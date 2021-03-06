$(document).ready(function () {
    $.ajax({
        url: "json/indexone.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            data.leftDbObject.forEach((i, k) => {
                $("#accordion").append(`
                <div  class="card">
                    <div onclick="argum(${k + 2});" class="card-header collap" role="tab" id="accordionHeading${k}" data-id="${i.idone}">
                        <div class="mb-0 row">
                            <div class="col-12 no-padding accordion-head">
                                <a data-toggle="collapse" data-parent="#accordion" href="#${i.idone}" aria-expanded="false" aria-controls="${i.idone}" class="collapsed ">
                                    <div class="title-style d-flex justify-content-start">
                                         <div id="zrf${i.idone}" class="title-style-div-one idzrf${k}">
                                              <img class="img-icon" src="img/b_plus.png" alt="logo">
                                              <img class="img-icone" src="img/b_minus.png" alt="logo">
                                            </div>
                                            <div class="title-style-div-two">
                                              <img class="coll-db-logo" src="img/s_db.png" alt="logo">
                                            </div>
                                            <div class="info-text">
                                               ${i.title}
                                         </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                     </div>
                   <div id="${i.idone}" class="collapse app${k}" role="tabpanel" aria-labelledby="${i.idone}" aria-expanded="false" data-parent="accordion" style="">
                                <div onclick="crNewTable(${k})" class="accordion-new-button col-12 d-flex"><div class="accordion-new-button-img"><img src="img/b_export.png" alt="logo"></div><div class="accordion-new-button-text">NEW</div</div>
                            </div>
                `);
            });
            setClickOnCollapse();
        }
    });

    function setClickOnCollapse() {
        $('.collap').on('click', function () {
            let id = $(this).attr('data-id');
            let bollVal = true;
            if ($(this).hasClass("active-two-icon-minus")) {
                $(this).removeClass("active-two-icon-minus");
                bollVal = true;
            } else {
                $(this).addClass("active-two-icon-minus");
                bollVal = false;
            }
            $.ajax({
                url: "json/collapsedlast.json",
                type: "GET",
                dataType: "json",
                beforeSend: function () {
                    $("#zrf" + id).children().remove();
                    $("#zrf" + id).append(`<div class="icon-load"> <i class="fa fa-spinner spiner-icon fa-spin" aria-hidden="true"></i></div> `)
                },
                success: function (data) {
                    $('.remove-data-' + id).remove();
                    data.table.forEach((i, k) => {
                        if (id == i.db_id) {
                            $("#" + id).append(`
<div class="card-block col-12 remove-data-${id}">
    <div class="panel-group " data-id="${i.id}">
        <div class="panel panel-default">
            <div onclick="cl(${k})" class="panel-heading">
                <div class="panel-title">
                    <a id="boll${id}" data-toggle="collapse" href="#${i.id}">
                        <div class="title-style indificetion d-flex justify-content-start">
                            <div id="rem${i.id}" class="title-style-div-one">
                                <img class="img-icon-two" src="img/b_plus.png" alt="logo">

                            </div>
                            <div class="title-style-div-two">
                                <img class="coll-db-logo" src="img/s_db.png" alt="logo">
                            </div>
                            <div class="info-text">

                                ${i.name}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div id="${i.id}" class="panel-collapse collapse append-divs">

            </div>
        </div>
    </div>
</div>`)
                        }
                    });
                    setTimeout(function () {
                        $("#zrf" + id).children().remove();
                        if (bollVal == true) {
                            $("#zrf" + id).append(`<img class="img-icon-two" src="img/b_plus.png" alt="logo">`);
                        } else {
                            $("#zrf" + id).append(`<img class="img-icone-two" src="img/b_minus.png" alt="logo">`);
                        }
                    }, 300);
                }
            });
        });
    }

    $(document).on('click', '.panel-group', function () {
        let idtwo = $(this).attr('data-id');
        let boll = true;
        if ($(this).hasClass("active-icon-minus")) {
            $(this).removeClass("active-icon-minus");
            boll = true;
        } else {
            $(this).addClass("active-icon-minus");
            boll = false;
        }
        $.ajax({
            url: "json/indexit.json",
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                $('#rem' + idtwo).children().remove();
                if (boll == false) {
                    $('#rem' + idtwo).append(`<div class="icon-load"> <i class="fa fa-spinner spiner-icon fa-spin" aria-hidden="true"></i></div> `)
                }
            },
            success: function (data) {
                $('.remove-zsd' + idtwo).remove();
                data.indexObject.forEach((p) => {
                    if (idtwo == p.db_id) {
                        $('#' + idtwo).append(` <div class="indexit-json-info remove-zsd${idtwo}">
                                            <div>${p.nameone}</div>
                                            <div>${p.nametwo}</div>
                                        </div>`)
                    }
                });
                if (boll == false) {
                    setTimeout(function () {
                        $('#rem' + idtwo).children().remove();
                        $('#rem' + idtwo).append(`<img class="img-icone-two" src="img/b_minus.png" alt="logo">`);
                    }, 300);
                } else {
                    $('#rem' + idtwo).children().remove();
                    $('#rem' + idtwo).append(`<img class="img-icon-two" src="img/b_plus.png" alt="logo">`);
                }

            }
        })
    });
});