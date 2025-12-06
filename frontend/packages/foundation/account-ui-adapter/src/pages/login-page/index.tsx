/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { type FC, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CozeBrand } from '@coze-studio/components/coze-brand';
import { I18n } from '@coze-arch/i18n';
import { Button } from '@coze-arch/coze-design';
import { SignFrame, SignPanel } from '@coze-arch/bot-semi';

import { useLoginService } from './service';
import { Favicon } from './favicon';

export const LoginPage: FC = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token'), [searchParams]);

  const { login, loginLoading } = useLoginService({
    token: token || undefined,
  });

  // 如果 URL 中有 token 参数，自动调用登录
  useEffect(() => {
    if (token) {
      login();
    }
  }, [token, login]);

  const handleLogin = () => {
    window.location.href = 'https://lcmp-sit.lenovo.com/auth/login-coze?return_url=http://localhost:8888/sign';
  };

  // 如果有 token，显示加载状态
  if (token) {
    return (
      <SignFrame brandNode={<CozeBrand isOversea={IS_OVERSEA} />}>
        <SignPanel className="w-[600px] h-[640px] pt-[96px]">
          <div className="flex flex-col items-center w-full h-full">
            <Favicon />
            <div className="text-[24px] font-medium coze-fg-plug leading-[36px] mt-[32px]">
              {I18n.t('open_source_login_welcome')}
            </div>
            <div className="mt-[64px] w-[320px] flex flex-col items-stretch justify-center text-center">
              {loginLoading ? (
                <div>{I18n.t('login_button_text')}...</div>
              ) : (
                <div>登录中...</div>
              )}
            </div>
          </div>
        </SignPanel>
      </SignFrame>
    );
  }

  // 没有 token，显示登录按钮
  return (
    <SignFrame brandNode={<CozeBrand isOversea={IS_OVERSEA} />}>
      <SignPanel className="w-[600px] h-[640px] pt-[96px]">
        <div className="flex flex-col items-center w-full h-full">
          <Favicon />
          <div className="text-[24px] font-medium coze-fg-plug leading-[36px] mt-[32px]">
            {I18n.t('open_source_login_welcome')}
          </div>
          <div className="mt-[64px] w-[320px] flex flex-col items-stretch">
            <Button
              data-testid="login.button.login"
              onClick={handleLogin}
              color="hgltplus"
            >
              {I18n.t('login_button_text')}
            </Button>
          </div>
        </div>
      </SignPanel>
    </SignFrame>
  );
};
