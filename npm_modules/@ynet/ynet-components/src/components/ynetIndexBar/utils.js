import dict from './pinyin_dict_firstletter'


function localSort(obj){
	let ordered = {}
	Object.keys(obj).sort().forEach(key => {
		let res = obj[key].sort(function(a, b){
			return a.text.localeCompare(b.text)
		})
		ordered[key] = res
	})
	return ordered
}

export function sortFn(data){
	let res = {}
	for(let i = 0; i < data.length; i++){
		let o = data[i]
		if(!o.text || /^ +$/g.test(o)){ continue }
		let unicode = o.text.charCodeAt(0)
		if(unicode >= 19968 && unicode <= 40869){
			let ch = dict.all.charAt(unicode-19968)
			res[ch] ? (res[ch].push(o)) : (res[ch] = [o])
		}else if((unicode >= 65 && unicode <= 90) || (unicode >= 97 && unicode <= 122)){
			let ch = o.text.charAt(0).toUpperCase()
			res[ch] ? (res[ch].push(o)) : (res[ch] = [o])
		}else{
			res['#'] ? (res['#'].push(o)) : (res['#'] = [o])
		}
	}

	return localSort(res)
}

