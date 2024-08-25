import Channel from '#models/channel';
import User from '#models/user';

type TransmitUid = string;
type UsersMap = Map<
  TransmitUid,
  { channelId: Channel['id']; userId: User['id'] }
>;

class OnlineUserService {
  private users: UsersMap = new Map();

  getUsersByChannelId(channelId: Channel['id']) {
    const userIds = this.usersMapToArray()
      .filter(([_, value]) => value.channelId === channelId)
      .map(([_, value]) => value.userId);

    return userIds;
  }

  addUserToChannel(
    uid: TransmitUid,
    userId: User['id'],
    channelId: Channel['id']
  ) {
    this.users.set(uid, { channelId, userId: userId });
  }

  removeUserFromChannel(uid: TransmitUid): Channel['id'] | undefined {
    const channelId = this.users.get(uid)?.channelId;
    this.users.delete(uid);
    return channelId;
  }

  getCurrentChannelForUid(uid: TransmitUid) {
    return this.users.get(uid)?.channelId;
  }

  getUserIdFromUid(uid: TransmitUid) {
    return this.users.get(uid)?.userId;
  }

  private usersMapToArray() {
    return Array.from(this.users);
  }
}

export default new OnlineUserService();
