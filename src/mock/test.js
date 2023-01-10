export default [
  {
    url: '/mock/test',
    method: 'post',
    response: () => {
      return {
        status: '200',
        success: true,
        result: ['@datetime', '@datetime', '@datetime'],
        message: '请求成功'
      };
    }
  }
];
