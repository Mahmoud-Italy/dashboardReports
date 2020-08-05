<template>
  <div class="">
        
        <Header></Header>

        <!-- Videos -->
        <div class="videos">
            <div class="container-fluid">
                <div class="videos-container">
                    <div class="title">إرشادات الطباعة | فيديو</div>
                    <div class="videos-header">
                        <div class="v-header">طباعة كتاب مشروع التخرج</div>
                        <div class="v-header">كل التفاصيل الهامة والإحتياطات عند طباعة كتاب مشروع تخرجك  بشكل إحترافي</div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-sm-6">
                            <div class="video-box" data-toggle="modal" data-target="#youtubeVideoModal">
                                <div class="video-body">
                                    <img src="img/covert.png" class="v-img-poster img-fluid" />
                                    <div class="v-overlay">
                                        <img src="img/icons/play.svg" class="v-play center-box img-fluid" />
                                    </div>
                                </div>
                                <div class="video-bottom">
                                    <div class="title">
                                        تجهز كتاب مشروع التخرج للطباعه
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4 col-sm-6">
                            <div class="video-box" data-toggle="modal" data-target="#youtubeVideoModal">
                                <div class="video-body">
                                    <img src="img/covert.png" class="v-img-poster img-fluid" />
                                    <div class="v-overlay">
                                        <img src="img/icons/play.svg" class="v-play center-box img-fluid" />
                                    </div>
                                </div>
                                <div class="video-bottom">
                                    <div class="title">
                                        انواع التجليد اللى ممكن تجلد بيها مشروع تخرجك؟
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4 col-sm-6">
                            <div class="video-box" data-toggle="modal" data-target="#youtubeVideoModal">
                                <div class="video-body">
                                    <img src="img/covert.png" class="v-img-poster img-fluid" />
                                    <div class="v-overlay">
                                        <img src="img/icons/play.svg" class="v-play center-box img-fluid" />
                                    </div>
                                </div>
                                <div class="video-bottom">
                                    <div class="title">
                                        تحويل ملفات المشروع الى ملف واحد PDF
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4 col-sm-6">
                            <div class="video-box" data-toggle="modal" data-target="#youtubeVideoModal">
                                <div class="video-body">
                                    <img src="img/covert.png" class="v-img-poster img-fluid" />
                                    <div class="v-overlay">
                                        <img src="img/icons/play.svg" class="v-play center-box img-fluid" />
                                    </div>
                                </div>
                                <div class="video-bottom">
                                    <div class="title">
                                        تجهز كتاب مشروع التخرج للطباعه
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4 col-sm-6">
                            <div class="video-box" data-toggle="modal" data-target="#youtubeVideoModal">
                                <div class="video-body">
                                    <img src="img/covert.png" class="v-img-poster img-fluid" />
                                    <div class="v-overlay">
                                        <img src="img/icons/play.svg" class="v-play center-box img-fluid" />
                                    </div>
                                </div>
                                <div class="video-bottom">
                                    <div class="title">
                                        انواع التجليد اللى ممكن تجلد بيها مشروع تخرجك؟
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4 col-sm-6">
                            <div class="video-box" data-toggle="modal" data-target="#youtubeVideoModal">
                                <div class="video-body">
                                    <img src="img/covert.png" class="v-img-poster img-fluid" />
                                    <div class="v-overlay">
                                        <img src="img/icons/play.svg" class="v-play center-box img-fluid" />
                                    </div>
                                </div>
                                <div class="video-bottom">
                                    <div class="title">
                                        تحويل ملفات المشروع الى ملف واحد PDF
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Videos -->

  </div>
</template>
<script>
import Header from '../layouts/Header.vue'
export default {
  name: 'videos',
  components: {
    Header
  },
  data () {
    return {
      //
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>