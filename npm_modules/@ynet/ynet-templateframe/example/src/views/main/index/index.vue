<template>
    <div class="page_index_show">
        <div class="title">欢迎回来，程序猿</div>
        <div class="table">
            <div class="loginInfo">
                <span>账号</span>
                <div><span>猎豹前端程序猿</span></div>
            </div>
            <div class="loginInfo">
                <span>机构</span>
                <div><span>易诚互动</span></div>
            </div>
            <div class="loginInfo">
                <span>岗位</span>
                <div><span>高级程序猿</span></div>
            </div>
            <div class="loginInfo">
                <span>角色</span>
                <div><span>前端</span></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
  .page_index_show {
    position: relative;
    width: 100%;
    height: 650px;
    background: #ffffff;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-family: MicrosoftYaHeiUI;
      font-size: 24px;
      color: #323C41;
      text-align: center;
      line-height: 90px;
      font-weight: 700;
    }
    .table {
      width: 480px;
      margin-top: 64px;
      .loginInfo{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24px;
        span{
          font-family: MicrosoftYaHeiUI;
          font-size: 12px;
          color: #323C41;
          letter-spacing: 0;
          line-height: 16px;
          margin-right: 32px;
        }
        div{
          width: 400px;
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border: 1px solid #DDE0E4;
          background:  #FAFAFC;
          padding-left: 16px;
          span{
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #323C41;
            letter-spacing: 0;
            line-height: 16px;
          }
        }
      }


      table {
        width: 100%;
        border: 0;
        margin: 0;
        border-collapse: collapse;
        border-spacing: 0;
        background: #fff;
        tr {
          &:hover {
            td {
              background-color: #F6FAFF;
            }
          }
          td {
            padding: 12px;
            border: 1px solid #f2f6fd;
            &.label {
              text-align: right;
            }
          }
        }

      }
    }
    .loginIp-info{
      width: 300px;
      height: 80px;
      position: absolute;
      bottom: 64px;
      right: 64px;
      p{
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #666666;
        text-align: right;
        line-height: 16px;
      }
    }
  }
</style>