import { FC, ReactElement } from 'react';
import Image from 'next/image';
import { IImage } from '@/interfaces/interfaces';
import styles from './BaseLayout.module.scss'

interface IBaseLayoutProps {
  children: ReactElement
  image?: IImage
  isAlignItemsCenter?: boolean
}

const BaseLayout: FC<IBaseLayoutProps> = ({ children, image, isAlignItemsCenter }) => {
  const layoutStyles = isAlignItemsCenter ? `layout ${styles.layout} ${styles.isAlignItemsCenter}` : styles.layout

  return (
      <div className={layoutStyles}>
        {children}
        {image && <Image className={styles.heroBg} src={image.src} alt={image.alt} fill priority></Image>}
      </div>
  );
};

export default BaseLayout;
