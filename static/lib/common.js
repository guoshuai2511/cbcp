export class DrawDevCover {

  static forbiddenSpace() {
    /* 禁止输入空格*/
    $(document).on('keyup blur', '.input-space-forbidden', function () {
      this.value = this.value.replace(/\s/g, '');
    });
    /* 用户名禁止输入空格*/
    $(document).on('keyup blur', '.input-space-forbidden-user', function () {
      if (/\s/.test(this.value)) {
          $('#is-have-user').html(`<span class="text-red">用户名不能包含空格</span>`);
      }
      this.value = this.value.replace(/\s/g, '');
    });
    /* 密码禁止输入空格*/
    $(document).on('keyup blur', '.input-space-forbidden-password', function () {
      if (/\s/.test(this.value)) {
          $('#is-pwd-true').html(`<span class="text-red">密码不能包含空格</span>`);
      }
      this.value = this.value.replace(/\s/g, '');
    });
    /* 禁止输入中文*/
    $(document).on('keyup blur', '.input-znch-forbidden', function () {
      this.value = this.value.replace(/[\u4e00-\u9fa5]/g, '');
    });
    /* 只允许输入数字*/
    $(document).on('keyup blur', '.input-num-only', function () {
      this.value = this.value.replace(/[^\d]/g, '');
    });
  };
      
}