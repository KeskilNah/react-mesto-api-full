import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import { Login } from "./Login";
import { InfoTooltip } from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as mestoAuth from "../utils/mestoAuth";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isRequestingServer, setIsRequestingServer] = useState(false);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([Api.getUserInfo(), Api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      mestoAuth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUserEmail(localStorage.getItem("email"));
            history.push("./");
          }
        })
        .catch((e) => console.log(`ошибка${e}`));
    }
  }, [history, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push("./");
    }
  }, [history, loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    Api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        setIsRequestingServer(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const handleDeleteButtonClick = (card) => {
    setIsRequestingServer(true);
    setDeletePopupOpen(!isDeletePopupOpen);
    setDeletedCard(card);
  };

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsRequestingServer(true);
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  const handleAddPlaceClick = () => {
    setIsRequestingServer(true);
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsRequestingServer(true);
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isRequestBad, setIsRequestBad] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setDeletePopupOpen(false);
    setInfoPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (name) => {
    Api.editProfile(name)
      .then((res) => {
        setCurrentUser(res);
        setIsRequestingServer(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdataAvatar = (avatar) => {
    Api.editAvatar(avatar.avatar.current.value)
      .then((res) => {
        setCurrentUser(res);
        setIsRequestingServer(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    Api.setCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        setIsRequestingServer(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const handleRegisterSubmit = (data) => {
    mestoAuth
      .register(data)
      .then((res) => {
        if (res) {
          setIsRequestBad(false);
          setInfoPopupOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRequestBad(true);
        setInfoPopupOpen(true);
      });
  };

  const handleLoginSubmit = (data) => {
    mestoAuth
      .login(data)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          mestoAuth.checkToken(res).then((response) => {
            localStorage.setItem("email", response.data.email);
            setCurrentUserEmail(localStorage.getItem("email"));
            setLoggedIn(true);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRequestBad(true);
        setInfoPopupOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.setItem("jwt", "");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          isRequesting={isRequestingServer}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          isRequesting={isRequestingServer}
        />
        <DeleteConfirmationPopup
          onClose={closeAllPopups}
          isOpen={isDeletePopupOpen}
          deletedCard={deletedCard}
          onDeletedCard={handleCardDelete}
          isRequesting={isRequestingServer}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdataAvatar}
          isRequesting={isRequestingServer}
        />
        <ImagePopup
          name="image"
          isOpen={!!selectedCard}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoPopupOpen}
          isRequestBad={isRequestBad}
        />
        <div className="page__wrapper">
          <Header email={currentUserEmail} onLogout={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteButtonClick}
            />
            <Route path="/sign-up">
              <Register onRegisterSubmit={handleRegisterSubmit} />
            </Route>
            <Route path="/sign-in">
              <Login onUpdateEmail={handleLoginSubmit} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
