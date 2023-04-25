<template>
  <ynet-viewbox>
    <ynet-header slot="viewbox-header" />
    <md-bill
      title="支付票据"
      no="305450361820190523095351"
    >
      <md-detail-item title="产品分类">
        虚拟主机(独立)
      </md-detail-item>
      <md-detail-item title="购买时长">
        24月
      </md-detail-item>
      <md-detail-item title="支付金额">
        &yen; 960.00
      </md-detail-item>
      <md-detail-item title="支付时间">
        2019-09-12 17:12:36
      </md-detail-item>
      <md-detail-item title="支付账户">
        <i class="alipay" /><span style="padding-left:.14rem">支付宝(274***@qq.com)</span>
      </md-detail-item>
      <md-detail-item title="收款账户">
        <i class="zs" /><span style="padding-left:.2rem">招商银行(尾号:4472)</span>
      </md-detail-item>
      <div
        slot="footer"
        class="footer-slot"
      >
        参与中秋活动赠送8个月免费使用 <br>
        注: 免费空间到期后需要重新解析IP指向
      </div>
    </md-bill>
  </ynet-viewbox>
</template>
<script>
import './assets/bank-zs.svg'
import { Bill, DetailItem, Icon } from 'mand-mobile'
import { ynetViewbox, ynetHeader } from '@ynet/ynet-components'
	
export default {
  components: {
    mdBill: Bill, mdDetailItem: DetailItem,
    mdIcon: Icon,
    ynetViewbox, ynetHeader
  }
}
</script>
<style lang="scss" scoped>
	.md-detail-title{
		font-size:.42rem;
	}
	.md-bill{
		background: #fff;
	}
	.zs{
		display: inline-block;
		width: .36rem;
		height: .36rem;
		background: url(./assets/bank-zs.svg) no-repeat center;
		background-size: 100%;
	}
	.alipay{
		display: inline-block;
		width: .46rem;
		height: .46rem;
		background: url(./assets/alipay.svg) no-repeat center;
		background-size: 100%;
	}
	.footer-slot{
		padding: 32px 0;
		color: #858B9C;
		line-height: 1.5;
		border-top: solid 1px #E1E4EB
	}
</style>