export default [{

	/**
	*	计算像素
    */
   methods: {
        
        concatImageUrl (url) {
            let imageUrlDomains = window.imageUrlDomains
            if(imageUrlDomains){
                let len = imageUrlDomains.length
                for(let i = 0; i < len; i++){
                    let domainInfo = imageUrlDomains[i]
                    let regExp = domainInfo.regExp
                    let replace = domainInfo.replace
                    if(regExp && replace && regExp.test(url)){
                        return url.replace(regExp, replace)
                    }
                }
            }
            return url
        }

    }
}]
