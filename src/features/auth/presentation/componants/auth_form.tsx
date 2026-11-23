import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { CustomInput } from "../../../../core/componants/custom_input";
import { CustomButton } from "../../../../core/componants/custum_btn";
import { MainText } from "../../../../core/componants/text_section";
import { COLORS } from "../../../../core/constants/colors";
import { FONT_STYLES } from "../../../../core/constants/fonts";
import { AppRoutesNames as routes } from "../../../../app/routers/routes";
import CustumBtnLoader from "../../../../core/componants/custum_btn_loader";
import { CustumError } from "../../../../core/componants/custum_error";
import { useAuthForm } from "../hooks/use_auth_form";
type AuthFormProps = {
  type: "login" | "signup";
};

export function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === "login";
  const intl = useIntl();

  const {
    register,
    handleProcess,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    serverError,
    clearError,
    isSubmitting,
    isLocked,
  } = useAuthForm(isLogin);

  const formValues = watch();

  const getFieldProps = (
    fieldName:
      | "firstName"
      | "lastName"
      | "email"
      | "password"
      | "confirmPassword",
  ) => ({
    value: formValues[fieldName] || "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(fieldName, e.target.value, {
        shouldValidate: true,
      }),
    error: errors[fieldName]?.message,
  });

  const isButtonDisabled =
    isSubmitting ||
    isLocked ||
    !isValid ||
    (isLogin
      ? !formValues.email || !formValues.password
      : !formValues.firstName ||
        !formValues.lastName ||
        !formValues.email ||
        !formValues.password ||
        !formValues.confirmPassword);

  return (
    <div className="relative w-full space-y-3 py-1 md:py-2 lg:py-2">
      {serverError && (
        <CustumError apiError={serverError} clearError={clearError} />
      )}

      <MainText
        bigTitle={intl.formatMessage({
          id: isLogin ? "auth.welcomeBack" : "auth.createAccount",
        })}
        smallTitle={intl.formatMessage({
          id: isLogin ? "auth.loginSubtitle" : "auth.signupSubtitle",
        })}
      />

      <form onSubmit={handleSubmit(handleProcess)} className="space-y-1">
        {!isLogin && (
          <CustomInput
            label={intl.formatMessage({ id: "auth.firstName" })}
            placeholder={intl.formatMessage({
              id: "auth.enterFirstName",
            })}
            {...getFieldProps("firstName")}
          />
        )}

        {!isLogin && (
          <CustomInput
            label={intl.formatMessage({ id: "auth.lastName" })}
            placeholder={intl.formatMessage({
              id: "auth.enterLastName",
            })}
            {...getFieldProps("lastName")}
          />
        )}

        <CustomInput
          label={intl.formatMessage({ id: "auth.email" })}
          placeholder={intl.formatMessage({
            id: "auth.enterEmail",
          })}
          {...getFieldProps("email")}
        />

        <div
          className={
            isLogin ? "space-y-2" : "grid grid-cols-1 md:grid-cols-2  md:gap-4 "
          }
        >
          <CustomInput
            label={intl.formatMessage({ id: "auth.password" })}
            placeholder="••••••••"
            type="password"
            {...getFieldProps("password")}
          />

          {!isLogin && (
            <CustomInput
              label={intl.formatMessage({ id: "auth.confirmPassword" })}
              placeholder="••••••••"
              type="password"
              {...getFieldProps("confirmPassword")}
            />
          )}
        </div>

        {isLogin && (
          <div className="flex flex-col flex-row  justify-between gap-2 pb-2 ">
            <label
              className={`
                flex items-center gap-2
                ${FONT_STYLES.body}
                text-gray-600
                cursor-pointer
              `}
            >
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <FormattedMessage id="auth.rememberMe" />
            </label>

            <Link
              to={routes.forgotPassword}
              className={`${FONT_STYLES.body} font-bold hover:underline`}
              style={{ color: COLORS.text.coloredText }}
            >
              <FormattedMessage id="auth.forgotPassword" />
            </Link>
          </div>
        )}

        <CustomButton
          style={{ background: COLORS.button.primary }}
          className="w-full text-white "
          type="submit"
          disabled={isButtonDisabled}
        >
          {isSubmitting ? (
            <CustumBtnLoader />
          ) : (
            intl.formatMessage({
              id: isLogin ? "auth.login" : "auth.startLearning",
            })
          )}
        </CustomButton>
      </form>

      <p
        className={`
          ${FONT_STYLES.body}
          text-center
          text-gray-600
          px-2
        `}
      >
        <FormattedMessage
          id={isLogin ? "auth.noAccount" : "auth.haveAccount"}
        />

        <Link
          to={isLogin ? routes.signup : routes.login}
          className={`${FONT_STYLES.body} ml-1 font-bold hover:underline`}
          style={{ color: COLORS.text.coloredText }}
        >
          <FormattedMessage id={isLogin ? "auth.signup" : "auth.loginLink"} />
        </Link>
      </p>
    </div>
  );
}
