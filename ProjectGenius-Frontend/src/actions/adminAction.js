import axios from '../config/axios'

export const login = async (data) => {

    try {
        let respData = await axios({
            'url': '/login',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'token': respData.data.token
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const verify = async (data) => {

    try {
        let respData = await axios({
            'url': '/verification',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const Reverify = async () => {

    try {
        let respData = await axios({
            'url': '/re-verification',
            'method': 'get',

        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }
}
export const registerStudent = async (formData) => {

    try {
        let respData = await axios({
            'url': '/admission',
            'method': 'post',
            'data': formData
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const registerStudentValid = async () => {

    try {
        let respData = await axios({
            'url': '/admission-valid',
            'method': 'post',
           
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const studentAadhar = async () => {

    try {
        let respData = await axios({
            'url': '/getstudentaadhaar',
            'method': 'get',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
        }
    } catch (err) {
           console.log(err,'---err')
    }
}
export const viewStudent = async () => {

    try {
        let respData = await axios({
            'url': '/viewstudent',
            'method': 'post',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
            'imageUrl': respData.data.imageUrl,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }
}

export const deleteStudent = async (id) => {

    try {
        let respData = await axios({
            'url': '/deletestudent/' + id,
            'method': 'get'
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }

}

export const getSinglestudent = async (id) => {
    try {
        let respData = await axios({

            'url': '/getsingle-student/' + id,
            'method': 'get',

        })

        return {
            'status': respData.data.status,
            'result': respData.data.result
        }

    } catch (err) {
        console.log(err, 'errrr')
    }
}
export const updateStudent = async (formData) => {
    try {
        let respData = await axios({

            'url': '/updatestudent',
            'method': 'post',
           'data': formData

        })

        return {
            'status': respData.data.status,
            'message': respData.data.message,

        }

    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors' : err.response.data.errors
        }
    }
}
export const feeSetup = async (data) => {

    try {
        let respData = await axios({
            'url': '/feessetup',
            'method': 'post',
            'data':data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}

export const viewFees = async () => {

    try {
        let respData = await axios({
            'url': '/viewfees',
            'method': 'get',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }
}

export const getSinglefees = async (id) => {
    try {
        let respData = await axios({

            'url': '/getsingle-fees/' + id,
            'method': 'get',

        })

        return {
            'status': respData.data.status,
            'result': respData.data.result
        }

    } catch (err) {
        console.log(err, 'errrr')
    }
}

export const feeUpdate = async (data) => {

    try {
        let respData = await axios({
            'url': '/feesupdate',
            'method': 'post',
            'data':data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }

}

export const feeCollection = async (data) => {

    try {
        let respData = await axios({
            'url': '/feescollection',
            'method': 'post',
            'data':data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
       
        }
    } catch (err) {
        return{
        'status': err.response.data.status,
        'message': err.response.data.message,
        'errors' : err.response.data.errors,
        }
    }
}
export const feesPaid = async (data) => {

    try {
        let respData = await axios({
            'url': '/feespaid',
            'method': 'post',
            'data':data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
       
        }
    } catch (err) {
      console.log(err)
    }
}
export const feesStatus = async (Data) => {

    try {
        let respData = await axios({
            'url': '/feesstatus',
            'method': 'post',
            'data':Data,
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
      console.log(err)
    }
}
export const Sectionallocation = async (data) => {

    try {
        let respData = await axios({
            'url': '/singlesectionallocate',
            'method': 'post',
            'data':data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
       
        }
    } catch (err) {
        return{
        'status': err.response.data.status,
        'message': err.response.data.message,
        'errors' : err.response.data.errors,
        }
    }
}
export const Verifysinglesection = async (Sectiondata) => {

    try {
        let respData = await axios({
            'url': '/singlesectionverify',
            'method': 'post',
            'data':Sectiondata
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
       console.log(err,'--err')
    }
}
export const Groupsectionallocation = async (finalData) => {

    try {
        let respData = await axios({
            'url': '/groupsectionallocate',
            'method': 'post',
            'data':finalData
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
       
        }
    } catch (err) {
       console.log(err)
    }
}
export const GroupVerifysection = async (Sectiondata) => {

    try {
        let respData = await axios({
            'url': '/groupsectionverify',
            'method': 'post',
            'data':Sectiondata
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
       console.log(err,'--err')
    }
}
export const registerTeacher = async (formData) => {

    try {
        let respData = await axios({
            'url': '/teacheradmission',
            'method': 'post',
            'data': formData
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const viewTeacher = async () => {

    try {
        let respData = await axios({
            'url': '/viewteacher',
            'method': 'get',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
            'imageUrl': respData.data.imageUrl,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }
}
export const teacherAadhar = async () => {

    try {
        let respData = await axios({
            'url': '/getteacheraadhaar',
            'method': 'get',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
        }
    } catch (err) {
           console.log(err,'---err')
    }
}

export const updateTeacher = async (formData) => {
    try {
        let respData = await axios({

            'url': '/updateteacher',
            'method': 'post',
           'data': formData

        })

        return {
            'status': respData.data.status,
            'message': respData.data.message,

        }

    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors' : err.response.data.errors
        }
    }
}
export const getSingleteacher = async (id) => {
    try {
        let respData = await axios({

            'url': '/getsingle-teacher/' + id,
            'method': 'get',

        })

        return {
            'status': respData.data.status,
            'result': respData.data.result
        }

    } catch (err) {
        console.log(err, 'errrr')
    }
}
export const deleteTeacher = async (id) => {

    try {
        let respData = await axios({
            'url': '/deleteteacher/' + id,
            'method': 'get'
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }

}
export const createteacherschedule = async (data) => {

    try {
        let respData = await axios({
            'url': '/teacherschedule',
            'method': 'post',
            'data': data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
       console.log(err,'--err')
    }
}
export const getTeacherSchedule = async (teacherId) => {
    try {
        let respData = await axios({

            'url': '/getteacherschedule/' + teacherId,
            'method': 'get',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
            'result2': respData.data.result2
        }

    } catch (err) {
        console.log(err, 'errrr')
    }
}
export const getfixedschedule = async (data) => {
    try {
      let respData = await axios({
        url: '/getfixedschedule',
        method: 'get',
        params: data // Use params for GET requests
      });
  
      return {
        status: respData.data.status,
        result: respData.data.result
      };
  
    } catch (err) {
      console.log(err, 'errrr');
      // Handle the error or throw it to be caught by the calling code
      throw err;
    }
  }