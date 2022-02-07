import axios from 'axios'
import router from '../router'
export default{
    state:{
        user:{},
        users:{},
        profile:{},
        receipt:null,
        receipts:null,
        form:{},
        histories:{},
        status:[],
        errors:{},
        errSender:{},
        errReceiver:{},
        errReceipt:{},
        loading:false


    },
    getters:{

    },
    mutations:{
        setForm(state,set){
            state.form=set
        },
        setErrors(state,errors){
            state.errors=errors        
        },
        setHistories(state,histories){
            state.histories=histories        
        },
        setErrorsSender(state,errors){
            state.errSender=errors        
        },
        setErrorsReceiver(state,errors){
            state.errReceiver=errors        
        },
        setErrorsReceipt(state,errors){
            state.errReceipt=errors        
        },
        setReceipt(state,receipt){
            state.receipt=receipt        
        },
        setReceipts(state,receipts){
            state.receipts=receipts        
        },
        setStatus(state,status){
            state.status=status        
        },
    },
    actions:{
        refresh({commit},){
                    commit('setForm',{})
                    commit('setErrors',{})
        },
        async receipt({commit},noResi){
            try {
                let response = await axios.get('/api/receipt/'+noResi,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    let receipt =response.data.receipt
                    commit('setReceipt',receipt)
                    commit('setErrors',false)
                }  
            } catch (errors) {
                commit('setErrors',errors.response.data)
                commit('setReceipt',null)
            }
        },
        async receiptForUp({commit},noResi){
            try {
                let response = await axios.get('/api/receipt/'+noResi,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    let receipt =response.data.receipt
                    commit('setForm',receipt)
                    commit('setErrors',false)
                }  
            } catch (errors) {
                commit('setErrors',errors.response.data)
                commit('setForm',null)
            }
        },
        async getReceipts({commit}){
            try {
                let response = await axios.get('/api/receipts',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    let receipt =response.data.receipt
                    commit('setReceipts',receipt)
                    commit('setErrors',false)
                }  
            } catch (errors) {
                commit('setErrors',errors.response.data)
                commit('setReceipts',null)
            }
        },
        async getStatus({commit}){
            try {
                let response = await axios.get('/api/statuses',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    let status =response.data.status
                    commit('setStatus',status)
                }  
            } catch (errors) {
                commit('setErrors',errors.response.data)
                commit('setReceipts',null)
            }
        },
        async searchReceipt({commit},form){
            try {
                let response = await axios.post('/api/receipts/search',form,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    let receipt =response.data.receipt
                    commit('setReceipts',receipt)
                    commit('setErrors',false)
                }  
            } catch (errors) {
                commit('setErrors',errors.response.data)
                commit('setReceipts',null)
            }
        },
        async senderUp({commit},form){
            try {
                let response = await axios.put('/api/sender/'+form.id+'/update',form,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    commit('setErrorsSender',false)
                    alert('data berhasil di ubah')
                }  
            } catch (errors) {
                commit('setErrorsSender',errors.response.data.errors)
            }
        },
        async receiverUp({commit},form){
            try {
                let response = await axios.put('/api/receiver/'+form.id+'/update',form,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    commit('setErrorsReceiver',false)
                    alert('data berhasil di ubah')
                }  
            } catch (errors) {
                commit('setErrorsReceiver',errors.response.data.errors)
            }
        },
        async receiptUp({commit},form){
            try {
                let response = await axios.put('/api/receipt/'+form.id+'/update',form,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    commit('setErrorsReceipt',false)
                    alert('data berhasil di ubah')

                }  
            } catch (errors) {
                commit('setErrorsReceipt',errors.response)
            }
        },
        async statusUp({commit},form){
            try {
                let response = await axios.put('/api/receipt/'+form.id+'/change_status',form,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    commit('setErrorsReceipt',false)
                    alert('data berhasil di ubah')

                }  
            } catch (errors) {
                commit('setErrors',errors.response.data.errors)
                commit('setErrorsReceipt',errors.response)
            }
        },
        async create({commit},form){
            try {
                let response = await axios.post('/api/receipt/create',form,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    let receipt =response.data.receipt
                    commit('setReceipts',receipt)
                    commit('setErrors',false)
                    router.push('/receipt')
                }  
            } catch (errors) {
                commit('setErrors',errors.response.data.errors)
                commit('setReceipts',null)
            }
        },
        async createStatus({commit},data){
            try {
                let response = await axios.post('/api/status/create',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    commit('setSuccess',response.data.success)
                    commit('setErrors',{})
                    commit('setForm',{})
                    alert('data berhasil di simpan')
                }  
            } catch (errors) {
                commit('setSuccess',false)
                commit('setErrors',errors.response.data.errors)            }          
    },
        async saveStatus({commit},data){
                try {
                    let response = await axios.put('/api/status/'+data.id+'/update',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    if (response.status==200) {
                        commit('setSuccess',response.data.success)
                        commit('setErrors',false)
                        alert('data berhasil di ubah')
                    }  
                } catch (errors) {
                    commit('setSuccess',false)
                }          
        },
        async destroy({commit},data){
            let pilih = window.confirm("Yakin Akan Menghapus?");
            if (pilih) {
                try {
                    let response = await axios.delete('/api/receipt/'+data+'/delete',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    if (response.status==200) {
                        commit('setSuccess',response.data.success)
                        commit('setErrors',false)
                    }  
                } catch (errors) {
                    commit('setSuccess',false)
                }          
            }
        },
        async destroyStatus({commit},data){
            let pilih = window.confirm("Yakin Akan Menghapus?");
            if (pilih) {
                try {
                    let response = await axios.delete('/api/status/'+data.id+'/delete',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    if (response.status==200) {
                        commit('setSuccess',response.data.success)
                        commit('setErrors',false)
                        alert('data berhasil di hapus')
                    }  
                } catch (errors) {
                    commit('setSuccess',false)
                }          
            }
        },
        async getHistories({commit},form){
            try {
                let response = await axios.get('/api/receipt/'+form+'/history',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status==200) {
                    let history =response.data.history
                    commit('setHistories',history)
                    commit('setErrors',false)
                }  
            } catch (errors) {
                console.log(errors)
         }
        },

    },
}