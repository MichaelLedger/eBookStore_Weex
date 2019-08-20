
let stream = weex.requireModule('stream')
export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    isIpx () {
      return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6')
    },
    MXRGET (api, param, callback) {
      if (param !== undefined || param !== null) {
        api = api + '?'
        for (let key in param) {
          api = api + key + '=' + param[key] + '&'
        }
      }
      return stream.fetch({
        method: 'GET',
        type: 'json',
        url: 'https://bs-api.mxrcorp.cn' + api
        // url: 'http://10.242.69.181:8089/yanxuan/' + api
      }, callback)
    },
    MXRPOST (api, param, callback) {
      if (param !== undefined || param !== null) {
        let httpBody = JSON.stringify(param)
        // need to do 加密
        return stream.fetch({
          method: 'POST',
          type: 'json',
          url: 'https://bs-api.mxrcorp.cn' + api,
          body: httpBody
        }, callback)
      }
      return stream.fetch({
        method: 'POST',
        type: 'json',
        url: 'https://bs-api.mxrcorp.cn' + api
        // url: 'http://10.242.69.181:8089/yanxuan/' + api
      }, callback)
    }
  }
}
