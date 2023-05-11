import { css } from '@emotion/css';
import React from 'react';

import { Button, Field, Form, HorizontalGroup, LinkButton } from '@grafana/ui';
import config from 'app/core/config';
import { UserDTO } from 'app/types';

import { PasswordField } from '../../core/components/PasswordField/PasswordField';

import { ChangePasswordFields } from './types';

export interface Props {
  user: UserDTO;
  isSaving: boolean;
  onChangePassword: (payload: ChangePasswordFields) => void;
}

export const ChangePasswordForm = ({ user, onChangePassword, isSaving }: Props) => {
  const { disableLoginForm } = config;
  const authSource = user.authLabels?.length && user.authLabels[0];

  if (authSource === 'LDAP' || authSource === 'Auth Proxy') {
    return <p>You cannot change password when signed in with LDAP or auth proxy.</p>;
  }
  if (authSource && disableLoginForm) {
    return <p>Пароль не можна змінити тут.</p>;
  }

  return (
    <div
      className={css`
        max-width: 400px;
      `}
    >
      <Form onSubmit={onChangePassword}>
        {({ register, errors, getValues }) => {
          return (
            <>
              <Field label="Старий пароль" invalid={!!errors.oldPassword} error={errors?.oldPassword?.message}>
                <PasswordField
                  id="current-password"
                  autoComplete="current-password"
                  {...register('oldPassword', { required: 'Обов\'язкове поле' })}
                />
              </Field>

              <Field label="New password" invalid={!!errors.newPassword} error={errors?.newPassword?.message}>
                <PasswordField
                  id="new-password"
                  autoComplete="new-password"
                  {...register('newPassword', {
                    required: 'Обов\'язкове поле',
                    validate: {
                      confirm: (v) => v === getValues().confirmNew || 'Паролі не зпівпадають',
                      old: (v) => v !== getValues().oldPassword || `Новий пароль повинен відрізнятися від старого.`,
                    },
                  })}
                />
              </Field>

              <Field label="Confirm password" invalid={!!errors.confirmNew} error={errors?.confirmNew?.message}>
                <PasswordField
                  id="confirm-new-password"
                  autoComplete="new-password"
                  {...register('confirmNew', {
                    required: 'Обов\'язкове поле',
                    validate: (v) => v === getValues().newPassword || 'Паролі не зпівпадають',
                  })}
                />
              </Field>
              <HorizontalGroup>
                <Button variant="primary" disabled={isSaving} type="submit">
                  Змінити пароль
                </Button>
                <LinkButton variant="secondary" href={`${config.appSubUrl}/profile`} fill="outline">
                  Скасувати
                </LinkButton>
              </HorizontalGroup>
            </>
          );
        }}
      </Form>
    </div>
  );
};
