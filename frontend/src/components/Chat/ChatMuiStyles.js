export const modalStyles = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const modalContentBoxStyles = {
  transition: "background-color 0.3s ease-in",
  borderRadius: "10px",
  width: "70%",
  padding: "2rem",
  backgroundColor: "white",

  "&:hover": {},
  "@media (max-width: 780px)": {
    width: "95%",
    padding: "1rem",
  },
};

export const modalHeaderStyles = {
  fontSize: "1.7rem",
  marginBottom: "2rem",
};

export const autoCompleteStackStyles = {
  marginBottom: "2rem",
  width: "50%",
  "@media (max-width: 1000px)": {
    width: "90%",
    margin: "0 auto 2rem auto",
  },
};

export const createButtonWrapStyles = {
  textAlign: "center",
};

export const createButtonStyles = {
  textAlign: "center",
  backgroundColor: "black",
  width: "100%",
  padding: "1rem 0 1rem",
  fontSize: "1.4rem",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {},
};

export const groupNameInputWrapStyles = {
  marginBottom: "3rem",
  width: "100%",
};

export const groupNameInputStyles = {
  width: "50%",
  "@media (max-width: 1000px)": {
    width: "90%",
  },
};

export const formInputsWrapStyles = {
  padding: "0 0 0 2rem",
  "@media (max-width: 1000px)": {
    padding: 0,
    textAlign: "center",
  },
};
