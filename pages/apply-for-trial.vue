<template>
  <div class="apply-page">
    <UForm class="form-box" ref="form" :validate="validate" :state="state" @submit="onSubmit">
      <h1 class="form-title">申请免费试用</h1>

      <UFormGroup class="form-item" size="xl" name="user_name" required>
        <template #default="{ error }">
          <UInput class="form-ipt" v-model.trim="state.user_name" placeholder="真实姓名" autocomplete="off"
            :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-show="state.user_name !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                :padded="false" @click="state.user_name = ''" />
            </template>
          </UInput>
        </template>
        <template #error="{ error }">
          <div class="error-text">{{ error }}</div>
        </template>
      </UFormGroup>
      <UFormGroup class="form-item" size="xl" name="company_name" required>
        <UInput class="form-ipt" v-model.trim="state.company_name" placeholder="企业全称" autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton v-show="state.company_name !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
              :padded="false" @click="state.company_name = ''" />
          </template>
        </UInput>
        <template #error="{ error }">
          <div class="error-text">{{ error }}</div>
        </template>
      </UFormGroup>
      <UFormGroup class="form-item" size="xl" name="phone" required>
        <UInput class="form-ipt" v-model.trim="state.phone" placeholder="手机号码" autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton v-show="state.phone !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
              :padded="false" @click="state.phone = ''" />
          </template>
        </UInput>
        <template #error="{ error }">
          <div class="error-text">{{ error }}</div>
        </template>
      </UFormGroup>

      <UFormGroup class="form-item" size="xl" name="code" required>
        <div class="flex justify-between">
          <UInput class="form-ipt flex-1" v-model.trim="state.code" placeholder="请输入验证码" autocomplete="off"
            :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-show="state.code !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                :padded="false" @click="state.code = ''" />
            </template>
          </UInput>
          <ClientOnly >
            <UButton size="xl" class="w-[112px] ml-[16px]" :ui="{ padding: { xl: 'px-[16px]' } }" :disabled="disabled">
              <span v-if="countdown <= 0" class="text-[16px]" @click="getCode">获取验证码</span>
              <span v-else class="text-[16px] w-full">{{ countdown }}s</span>
            </UButton>
          </ClientOnly>
        </div>
        <template #error="{ error }">
          <div class="error-text">{{ error }}</div>
        </template>
      </UFormGroup>

      <div class="flex items-center">
        <UCheckbox v-model="privacyAgreementAccepted"></UCheckbox>
        <span class="ms-[4px] text-[12px] flex items-center">
          我已阅读并同意<span class="text-primary cursor-pointer"
            @click="navigateTo('/doc-legal-statement', { open: { target: '_blank' } })">法律声明</span>、<span
            class="text-primary cursor-pointer"
            @click="navigateTo('/doc-privacy-agreement', { open: { target: '_blank' } })">隐私保护声明</span></span>
      </div>

      <UButton class="mt-[24px] h-[48px]" size="xl" block type="submit">
        开始试用
      </UButton>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import { checkUsername, checkPhone } from '@/composables/validate'
import { useIntervalFn, useStorage } from '@vueuse/core'

/** 表单数据 */
const state = reactive({
  user_name: '',
  company_name: '',
  phone: '',
  code: '',
})

const form = ref()


/** 是否同意隐私协议 */
const privacyAgreementAccepted = ref(false)


/**
 * 校验表单数据
 *
 * @param state 表单数据
 * @returns 返回一个包含FormError对象的数组，表示校验结果
 */
const validate = async (state: any): Promise<FormError[]> => {
  const errors: FormError[] = []

  let p1 = checkUsername(state.user_name).catch((err) => {
    errors.push({
      path: 'user_name',
      message: err
    })
  })

  if (state.company_name.trim() === '') {
    errors.push({
      path: 'company_name',
      message: '请输入企业全称'
    })
  }

  let p2 = checkPhone(state.phone).catch((err) => {
    errors.push({
      path: 'phone',
      message: err
    })
  })

  if (state.code.trim() === '') {
    errors.push({
      path: 'code',
      message: '请输入验证码'
    })
  }

  await Promise.all([p1, p2])

  return errors
}


const loading = ref(false)
/**
 * 获取验证码
 */
async function getCode() {
  if (loading.value) return

  try {
    await checkPhone(state.phone)
  } catch (error: any) {
    message.warning(error)
    return
  }
  try {
    loading.value = true

    const response = await $fetch('/api/v1/portal/sendtryoutsmscode', {
      method: 'POST',
      body: {
        phone: state.phone,
      }
    }) as any

    if (response.code === 1000) {
      countdown.value = 60
      resume()
      message.success("发送成功");

    } else {
      message.error(response.msg);
    }

  } catch (error) {
    message.error('网络异常')

  } finally {
    loading.value = false
  }
}

const countdown = useStorage('tlzk-website-countdown', 0)
const disabled = computed(() => countdown.value !== 0)
const { pause, resume } = useIntervalFn(() => {
  if (countdown.value > 0) {
    countdown.value--
  } else {
    pause()
  }
}, 1000)

/**
 * 提交表单函数
 *
 * @param event 表单提交事件对象
 * @returns 无返回值
 */
async function onSubmit(event: FormSubmitEvent<any>) {
  if (!privacyAgreementAccepted.value) {
    message.warning('请同意法律声明和隐私保护声明')
    return
  }

  try {
    const response = await $fetch('/api/v1/portal/teachertryout', {
      method: 'POST',
      body: state
    }) as any

    if (response.code === 1000) {
      message.success("提交成功");
    } else {
      message.error(response.msg);
    }

  } catch (err: any) {
    message.error('网络异常')
  }
}
</script>

<style lang="less" scoped>
.apply-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('@/assets/img/bg3.webp') no-repeat center;

  .form-box {
    width: 528px;
    height: 624px;
    padding: 64px;
    border-radius: 32px;
    background: linear-gradient(180deg, #ffffff, rgba(255, 255, 255, 0.49));
    border: 2px solid #fff;
    backdrop-filter: blur(5px);

    .form-title {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 32px;
      font-weight: bold;
      margin-bottom: 56px;
    }

    .form-item {
      :deep(.form-ipt) {
        input {
          height: 52px;
        }
      }

      .error-text {
        height: 24px;
        line-height: 16px;
        font-size: 14px;
      }
    }
  }
}

button[disabled] {
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.45);
}
</style>