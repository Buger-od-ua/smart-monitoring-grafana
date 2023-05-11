import React, { SyntheticEvent } from 'react';

import { selectors } from '@grafana/e2e-selectors';
import { Tooltip, Form, Field, VerticalGroup, Button } from '@grafana/ui';

import { submitButton } from '../Login/LoginForm';
import { PasswordField } from '../PasswordField/PasswordField';
interface Props {
  onSubmit: (pw: string) => void;
  onSkip?: (event?: SyntheticEvent) => void;
}

interface PasswordDTO {
  newPassword: string;
  confirmNew: string;
}

export const ChangePassword = ({ onSubmit, onSkip }: Props) => {
  const submit = (passwords: PasswordDTO) => {
    onSubmit(passwords.newPassword);
  };
  return (
    <Form onSubmit={submit}>
      {({ errors, register, getValues }) => (
        <>
          <Field label="Новий пароль" invalid={!!errors.newPassword} error={errors?.newPassword?.message}>
            <PasswordField
              id="new-password"
              autoFocus
              autoComplete="new-password"
              {...register('newPassword', { required: 'Пароль обов\'язковий' })}
            />
          </Field>
          <Field label="Підтвердити пароль" invalid={!!errors.confirmNew} error={errors?.confirmNew?.message}>
            <PasswordField
              id="confirm-new-password"
              autoComplete="new-password"
              {...register('confirmNew', {
                required: 'Пароль обов\'язковий',
                validate: (v: string) => v === getValues().newPassword || 'Паролі повинні співпадати!',
              })}
            />
          </Field>
          <VerticalGroup>
            <Button type="submit" className={submitButton}>
              Підтвердити
            </Button>

            {onSkip && (
              <Tooltip
                content="Якщо пропустити зміну пароля зараз, ви зможете змінити його потім."
                placement="bottom"
              >
                <Button fill="text" onClick={onSkip} type="button" aria-label={selectors.pages.Login.skip}>
                  Пропустити
                </Button>
              </Tooltip>
            )}
          </VerticalGroup>
        </>
      )}
    </Form>
  );
};
