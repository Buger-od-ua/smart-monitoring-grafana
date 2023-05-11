import { css } from '@emotion/css';
import React, { useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Form, Field, Input, Button, Legend, Container, useStyles2, HorizontalGroup, LinkButton } from '@grafana/ui';
import config from 'app/core/config';

interface EmailDTO {
  userOrEmail: string;
}

const paragraphStyles = (theme: GrafanaTheme2) => css`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.bodySmall.fontSize};
  font-weight: ${theme.typography.fontWeightRegular};
  margin-top: ${theme.spacing(1)};
  display: block;
`;

export const ForgottenPassword = () => {
  const styles = useStyles2(paragraphStyles);
  const loginHref = `${config.appSubUrl}/login`;
  return (
    <>
      <Legend>Востановити пароль</Legend>
      <HorizontalGroup>
        <p className={styles}>Якщо забули пароль - зверніться до адміністратора.</p>
        <LinkButton fill="text" href={loginHref}>
          Назад
        </LinkButton>
      </HorizontalGroup>
    </>
  );
};
