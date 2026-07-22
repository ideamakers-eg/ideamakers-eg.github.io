import React from 'react';
import { 
  Users, 
  Facebook, 
  Youtube, 
  Music2, 
  MoreHorizontal,
  Check
} from 'lucide-react';
import './SourceSelection.css';
import { motion, AnimatePresence } from 'motion/react';

export type SourceType = 'affiliate' | 'facebook' | 'youtube' | 'tiktok' | 'other' | '';

interface SourceSelectionProps {
  selectedSource: SourceType;
  onSourceSelect: (source: SourceType) => void;
  marketingCode: string;
  onCodeChange: (code: string) => void;
}

const sources = [
  { id: 'affiliate', label: 'من خلال مسوق', icon: Users },
  { id: 'facebook', label: 'فيسبوك', icon: Facebook },
  { id: 'youtube', label: 'يوتيوب', icon: Youtube },
  { id: 'tiktok', label: 'تيك توك', icon: Music2 },
  { id: 'other', label: 'أخرى', icon: MoreHorizontal },
];

export const SourceSelection: React.FC<SourceSelectionProps> = ({
  selectedSource,
  onSourceSelect,
  marketingCode,
  onCodeChange
}) => {
  return (
    <div className="source-selection-container">
      <h3 className="source-title">كيف تعرفت علينا؟</h3>
      
      <div className="source-grid">
        {sources.map((source) => {
          const Icon = source.icon;
          const isSelected = selectedSource === source.id;
          
          return (
            <motion.button
              key={source.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSourceSelect(source.id as SourceType)}
              className={`source-card ${isSelected ? 'selected' : ''}`}
            >
              <div className="source-icon-wrapper">
                <Icon className="w-6 h-6" />
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="check-badge"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
              <span className="source-label">{source.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedSource === 'affiliate' && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="affiliate-input-wrapper"
          >
            <div className="smart-input-group">
              <input
                type="text"
                placeholder=" "
                className="smart-input affiliate-input"
                value={marketingCode}
                onChange={(e) => onCodeChange(e.target.value)}
              />
              <label className="smart-label">كود المسوق</label>
              <div className="affiliate-info-area">
                <div className="field-definition">
                  ادخل الكود للحصول ع النسخة التجربيية
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
