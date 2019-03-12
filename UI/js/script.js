class DivSelector {
  constructor() {
    /** Initializing Left Tabs */
    this.currentDivName = 'inbox_list';
    this.elementInitialization();
    this.fabElementInitialization();
    this.handlersInitialization();

    this.retractButton.display = 'none';
    /** On mobile side bar */
    if (window.matchMedia('(max-width: 700px)').matches) {
      this.editDPlink = document.getElementById('editDPlink');
      this.passwordlink = document.getElementById('passwordlink');
      this.logoutlink = document.getElementById('logoutlink');
      this.editDPlink.addEventListener('click', () => this.onEditDpClicked());
      this.logoutlink.addEventListener('click', () => this.onLogOutClicked());
      this.passwordlink.addEventListener('click', () => this.onChangePassWordClicked());
    }
  }

  fabElementInitialization() {
    /** Floating Action Buttons (FAB) */

    this.sendFAB = document.getElementById('send');
    this.saveFAB = document.getElementById('save');
    this.deleteFAB = document.getElementById('delete');
    this.retractFAB = document.getElementById('retract');
    this.plusFAB = document.getElementById('plus');
    this.createFAB = document.getElementById('create');

    this.createFAB.addEventListener('click', () => this.onViewCreateGroupClicked());
    this.plusFAB.addEventListener('click', () => this.onViewAddUserToGroupClicked());

    /** Retract button in sent items list view */
    this.retractButton = document.querySelector('button.retract');

    this.fab = [
      this.sendFAB,
      this.saveFAB,
      this.deleteFAB,
      this.retractFAB,
      this.plusFAB,
      this.createFAB,
    ];
  }

  elementInitialization() {
    this.composeTab = document.getElementById('compose_tab');
    this.inboxTab = document.getElementById('inbox_tab');
    this.sentTab = document.getElementById('sent_tab');
    this.draftTab = document.getElementById('draft_tab');
    this.groupTab = document.getElementById('group_tab');
    this.editDPTab = document.getElementById('editDP');
    this.logoutTab = document.getElementById('logout');

    this.menuBar = document.getElementById('menu_button');
    this.closeDiv = document.getElementById('close-div');
    this.closeButton = document.querySelector('.close-div > button');
    this.changePasswordTab = document.getElementById('change_password_button');
    this.viewComposeForGroups = document.querySelectorAll(
      '#listview_group > a',
    );
    this.viewInboxMessage = document.querySelectorAll('#inbox_list > div > a');
    /** Initailizing tab for admin */
    this.adminGroupTab = document.getElementById('admin_group_tab');

    /** Initializing list of user view for admin */
    this.viewMembersOfGrroupForAdmin = document.querySelectorAll(
      '#admin_group > a',
    );

    this.adminGroupDiv = document.getElementById('admin_group'); // list of all groups for admin
    this.listOfUsersDiv = document.getElementById('list_of_users'); // list of users in a group for admin
    this.creatGroupDiv = document.getElementById('create_group');
    this.userProfileDiv = document.getElementById('user-profile');

    /** Title for sent, inbox and draft (Listview) */
    this.inboxTitle = document.querySelector('#inbox_list h1');

    /** Title for sent, inbox and draft (single message) */
    this.msgTitle = document.querySelector('#inbox_msg h1');

    this.emailField = document.getElementById('email');
  }

  handlersInitialization() {
    /** Attaching Event Listeners */
    this.composeTab.addEventListener('click', () => this.onComposeClicked());
    this.inboxTab.addEventListener('click', () => this.onInboxClicked());
    this.sentTab.addEventListener('click', () => this.onSentClicked());
    this.draftTab.addEventListener('click', () => this.onDraftClicked());
    this.groupTab.addEventListener('click', () => this.onGroupClicked());
    this.menuBar.addEventListener('click', () => this.onMenuBarClicked());
    this.viewComposeForGroups.forEach((group) => {
      group.addEventListener('click', () => this.onComposeGroupClicked());
    });
    this.viewMembersOfGrroupForAdmin.forEach((group) => {
      group.addEventListener('click', () => this.onViewMembersOfGrroupForAdminClicked());
    });
    this.viewInboxMessage.forEach((group) => {
      group.addEventListener('click', () => this.onViewInboxMessageClicked());
    });

    this.adminGroupTab.addEventListener('click', () => this.onAdminGroupClicked());
    document
      .querySelector('main')
      .addEventListener('click', () => this.onSideBarClicked());

    this.closeButton.addEventListener('click', () => {
      this.onClosedBarClicked();
    });

    this.editDPTab.addEventListener('click', () => this.onEditDpClicked());
    this.logoutTab.addEventListener('click', () => this.onLogOutClicked());
    this.changePasswordTab.addEventListener('click', () => this.onChangePassWordClicked());
  }

  static onLogOutClicked() {
    window.location = '../index.html';
  }

  onEditDpClicked() {
    this.onFABRemoveAll();
    this.saveFAB.classList.remove('no-display');
    this.onTopNavClicked('user_profile');
  }

  onChangePassWordClicked() {
    this.onTopNavClicked('change_password');
  }

  onTopNavClicked(action) {
    this.onFABRemoveAll();

    this.saveFAB.classList.remove('no-display');
    this.changeDivTo(action);
  }

  onMenuBarClicked() {
    document.querySelector('aside').style.display = 'block';

    this.closeDiv.style.display = 'block';
    this.menuBar.style.display = 'none';
  }

  onClosedBarClicked() {
    this.hidesideBar();
  }

  /** Remove sideBar using viewport */
  onSideBarClicked() {
    if (window.matchMedia('(max-width: 700px)').matches) {
      this.hidesideBar();
    }
  }

  hidesideBar() {
    document.querySelector('aside').style.display = 'none';

    this.closeDiv.style.display = 'none';
    this.menuBar.style.display = 'block';
  }

  /** Remove all FAB */

  onFABRemoveAll() {
    this.fab.forEach((fab) => {
      fab.classList.add('no-display');
    });
  }

  /** Event Listeners For User Tab */
  onComposeClicked() {
    this.onFABRemoveAll();

    document.getElementById('group-name-label').classList.add('no-display');
    this.emailField.classList.remove('no-display');

    this.sendFAB.classList.remove('no-display');
    this.saveFAB.classList.remove('no-display');
    this.changeDivTo('compose');
  }

  onInboxClicked() {
    this.onFABRemoveAll();
    this.listState = 'inbox';
    this.retractButton.display = 'none';
    this.inboxTitle.innerHTML = 'Inbox';
    this.msgTitle.innerHTML = 'Mail From';
    this.changeDivTo('inbox_list');
  }

  onSentClicked() {
    this.onMessageViewChange('sent', 'Sent Items', 'Mail To');
  }

  onDraftClicked() {
    this.onMessageViewChange('draft', 'Draft', '');
  }

  onMessageViewChange(state, page, innerTitle) {
    this.onFABRemoveAll();
    this.listState = state;
    this.inboxTitle.innerHTML = page;
    this.msgTitle.innerHTML = innerTitle;
    this.changeDivTo('inbox_list');
  }

  onGroupClicked() {
    this.onFABRemoveAll();
    this.changeDivTo('listview_group'); // the groups a user belongs to
  }

  onComposeGroupClicked() {
    this.onFABRemoveAll();
    this.emailField.classList.add('no-display');
    this.sendFAB.classList.remove('no-display');
    this.saveFAB.classList.remove('no-display');
    document.getElementById('group-name-label').classList.remove('no-display');

    this.changeDivTo('compose');
  }

  onAdminGroupClicked() {
    this.onFABRemoveAll();
    this.changeDivTo('admin_group');
    this.createFAB.classList.remove('no-display');
  }

  onViewMembersOfGrroupForAdminClicked() {
    this.onFABRemoveAll();
    this.plusFAB.classList.remove('no-display');
    this.createFAB.classList.remove('no-display');

    this.changeDivTo('list_of_users');
  }

  onViewAddUserToGroupClicked() {
    this.changeGroupView('Add User');
  }

  onViewCreateGroupClicked() {
    this.changeGroupView('Create Group');
  }

  changeGroupView(header) {
    this.onFABRemoveAll();
    document.querySelector('#create_group h1').innerHTML = header;
    document.querySelector('#create_group h2').classList.add('no-display');
    document.querySelector('#create_group ul').classList.add('no-display');
    document
      .querySelector('#create_group #group-name')
      .classList.remove('no-display');
    this.saveFAB.classList.remove('no-display');
    this.changeDivTo('create_group');
  }

  onViewInboxMessageClicked() {
    this.onFABRemoveAll();

    this.changeDivTo('inbox_msg');
  }

  changeDivTo(nextDivName) {
    const visibleDiv = document.getElementById(this.currentDivName);
    const nextDiv = document.getElementById(nextDivName);

    if (nextDivName === 'inbox_msg') {
      if (this.listState === 'inbox') {
        this.deleteFAB.classList.remove('no-display');
      } else if (this.listState === 'sent') {
        this.retractFAB.classList.remove('no-display');
        this.deleteFAB.classList.remove('no-display');
      } else if (this.listState === 'draft') {
        this.sendFAB.classList.remove('no-display');
        this.retractFAB.classList.remove('no-display');
        this.deleteFAB.classList.remove('no-display');
      }
    }

    visibleDiv.classList.add('no-display');
    nextDiv.classList.remove('no-display');
    /** Remove side bar using viewport */
    this.onSideBarClicked();

    this.currentDivName = nextDivName;
  }
}

const newLocal = new DivSelector();
