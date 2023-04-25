import imageview from './components/imageview'
import mixins from '../mixins'

export default [{

   components: {
        imageview
   },

	/**
	*	计算像素
    */
   methods: {
        calcpxbyelem (elem, ratiox, ratioy) {
            let value = elem.offsetWidth
            return (parseFloat(value) * parseFloat(ratioy))/parseFloat(ratiox)
        },

        calcpx (value, ratiox, ratioy) {
            return (parseFloat(value) * parseFloat(ratioy))/parseFloat(ratiox)
        },

        calcRatio (ratio) {
            let splits = (ratio || '').split(':')
            return {
                ratiox: splits[0] || '',
                ratioy: splits[1]  || ''
            }
        }
    }
}, ...mixins]
