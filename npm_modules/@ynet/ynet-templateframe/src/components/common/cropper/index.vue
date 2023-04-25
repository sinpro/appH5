<template>
    <div class="common_cropper">
        <img ref="image" :src="imgUrl"/>
    </div>
</template>
<script>
let Cropper = require("../../../lib/cropper/cropper.js").Cropper;

export default {
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    cropwidth: {
      type: Number,
      default: 750
    },
    cropheight: {
      type: Number,
      default: 300
    },
    containerwidth: {
      type: Number,
      default: 800
    },
    containerheight: {
      type: Number,
      default: 576
    },
    imgType: {
      type: String,
      default: "image/png"
    },
    fillColor: {
      type: String,
      default: "transparent"
    },
    ratio: {
      type: Number,
      default: 2
    }
  },

  mounted() {
    window.scropper = this
    this.initCropper()
  },

  methods: {

    initCropper () {
      let _this = this;
      this.previewWidth = parseInt(this.cropwidth, 10)*this.ratio;
      this.previewHeight = parseInt(this.cropheight, 10)*this.ratio;
      this.$scropper && this.$scropper.destroy && this.$scropper.destroy()

      this.$nextTick(() => {
        this.$scropper = new Cropper(this.$refs.image, {
          aspectRatio: this.previewWidth / this.previewHeight,
          guides: true,
          viewMode: "0",
          dragMode: "move",
          toggleDragModeOnDblclick: false,
          dragCrop: false,
          center: true,
          background: true,
          cropBoxMovable: false,
          cropBoxResizable: false,
          scalable: true,
          zoomable: true,
          zoomOnWheel: true,
          wheelZoomRatio: '0.1',
          movable: true,
          rotatable: false,
          ready() {
            _this.resetCropBox();
          }
        });
      })
    },

    getImageBase64() {
      let canvas = this.getCanvas()
      return canvas.toDataURL(this.imgType);
    },

    getImageBlob() {
      let canvas = this.getCanvas()
      return new Promise((resolve) => {
          canvas.toBlob ? canvas.toBlob(resolve, this.imgType) : (resolve())
      })
    },

    getCanvas () {
      return this.$scropper.getCroppedCanvas({
          width: this.previewWidth,
          height: this.previewHeight,
          fillColor: this.fillColor,
          imageSmoothingQuality: 'high'
      })
    },

    resetCropBox() {
      //设置裁剪框为指定 长款 矩形
      let intervalWidth = 0
      let intervalHeight = 0
      let cropBoxData = this.$scropper.getCropBoxData()

      intervalWidth = cropBoxData.width - this.previewWidth
      intervalHeight = cropBoxData.height - this.previewHeight
      cropBoxData.left += intervalWidth/2
      cropBoxData.top += intervalHeight/2
      cropBoxData.width = this.previewWidth
      cropBoxData.height = this.previewHeight
      this.$scropper.setCropBoxData(cropBoxData)

      let canvasData = this.$scropper.getCanvasData()

      intervalWidth = canvasData.width - canvasData.naturalWidth
      intervalHeight = canvasData.height - canvasData.naturalHeight
      canvasData.left = cropBoxData.left
      canvasData.top = cropBoxData.top
      canvasData.width = canvasData.naturalWidth
      canvasData.height = canvasData.naturalHeight
      this.$scropper.setCanvasData(canvasData)

    }
  },

  watch: {
    imgUrl() {
      this.initCropper()
    }
  }
};
</script>
<style scoped>
@import "../../../lib/cropper/cropper.css";

img {
  max-width: 100%;
}

.common_cropper {
  width: 800px;
  height: 576px;
}

.common_cropper.uploadMaterial-cropper {
  width: 400px;
  height: 400px;
}
</style>
