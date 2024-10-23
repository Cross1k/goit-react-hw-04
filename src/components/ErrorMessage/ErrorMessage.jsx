import css from "./ErrorMessage.module.css";

function ErrorMessage({ msg }) {
  return (
    <div className={css.error}>
      Error occured: &quot;{msg}&quot; 🙄. Please try again later 😉
    </div>
  );
}

export default ErrorMessage;
